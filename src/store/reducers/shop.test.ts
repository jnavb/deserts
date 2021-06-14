import fetchMock from 'fetch-mock';
import { Reducer, Thunk } from 'redux-testkit';
import { ShopState } from '../../models/store';
import {
  entityFactory,
  mockShopInitialState,
  productFactory,
} from '../../utils/test';
import { Shop } from '../actions';
import { shopReducer } from './shop';

describe('[Redux] Shop reducer', () => {
  describe('initial state', () => {
    it('should have initial state', () => {
      expect(shopReducer(undefined, {} as any)).toEqual(mockShopInitialState);
    });
  });

  describe('add to cart', () => {
    it('should add items to cart on initial state', () => {
      const product = productFactory.build({ price: 10, stock: 3 });
      const action = Shop.addToCart({ product, quantity: 3 });
      const result: Partial<ShopState> = {
        cart: entityFactory({ id: product.id, quantity: 3 }),
        totalAmount: 30,
      };

      Reducer(shopReducer).expect(action).toChangeInState(result);
    });

    it('should do nothing when adding to cart if product stock is depleted', () => {
      const product = productFactory.build({ stock: 0 });
      const action = Shop.addToCart({ product, quantity: 1 });

      Reducer(shopReducer).expect(action).toChangeInState({});
    });
  });

  describe('remove from cart', () => {
    it('should remove items from cart when are on existing state', () => {
      const product = productFactory.build({ price: 10 });
      const action = Shop.removeFromCart({ product, quantity: 1 });
      const state: ShopState = {
        cart: entityFactory({ id: product.id, quantity: 3 }),
        error: false,
        loading: false,
        products: { entities: {}, ids: [] },
        totalAmount: 30,
      };
      const result: Partial<ShopState> = {
        cart: entityFactory({ id: product.id, quantity: 2 }),
        totalAmount: 20,
      };

      Reducer(shopReducer)
        .withState(state)
        .expect(action)
        .toChangeInState(result);
    });

    it('should do nothing when removing from cart if cart is empty', () => {
      const product = productFactory.build();
      const action = Shop.removeFromCart({ product, quantity: 1 });

      Reducer(shopReducer).expect(action).toChangeInState({});
    });
  });

  describe('toggle favorite', () => {
    it('should do nothing if product is not found', () => {
      const product = productFactory.build({ favorite: false });
      const action = Shop.toggleFavorites(product);

      Reducer(shopReducer).expect(action).toChangeInState({});
    });

    it('should add a favorite product', () => {
      const product = productFactory.build({ favorite: false });
      const action = Shop.toggleFavorites(product);
      const state: Partial<ShopState> = {
        products: entityFactory(product),
      };
      const result: Partial<ShopState> = {
        products: {
          entities: { [product.id]: { favorite: true } as any },
          ids: [product.id],
        },
      };

      Reducer(shopReducer)
        .withState(state)
        .expect(action)
        .toChangeInState(result);
    });

    it('should remove a favorite product', () => {
      const product = productFactory.build({ favorite: true });
      const action = Shop.toggleFavorites(product);
      const state: Partial<ShopState> = {
        products: entityFactory(product),
      };
      const result: Partial<ShopState> = {
        products: entityFactory({ ...product, favorite: false }),
      };

      Reducer(shopReducer)
        .withState(state)
        .expect(action)
        .toChangeInState(result);
    });
  });

  describe('fetch products', () => {
    beforeEach(() => {
      fetchMock.restore();
    });

    it('should fetch only first 50 products', async () => {
      fetchMock.getOnce('http://localhost:3000/grocery', {
        body: productFactory.buildList(60),
        headers: { 'content-type': 'application/json' },
      });
      const dispatches = await Thunk(Shop.fetchProducts).execute();

      expect(dispatches.length).toBe(2);
      expect(dispatches[1].getAction().payload.length).toEqual(50);
    });
  });
});
