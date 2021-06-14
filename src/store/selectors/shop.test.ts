import { Selector } from 'redux-testkit';
import { RootState } from '../../models/store';
import {
  cartItemFactoryList,
  entityFactory,
  productFactory,
} from '../../utils/test';
import { selectCheckoutView, selectProductsView, selectShop } from './shop';

describe('[Redux] Shop selectors', () => {
  it('should get the entire shop store', () => {
    const state: RootState = {
      shop: {
        products: entityFactory(),
        cart: entityFactory(),
        error: false,
        loading: false,
        totalAmount: 0,
      },
    };

    Selector(selectShop).expect(state).toReturn(state.shop);
  });

  it('should get the entire shop store', () => {
    const products = productFactory.buildList(10);

    const state: RootState = {
      shop: {
        products: entityFactory(...products),
        cart: entityFactory(),
        error: false,
        loading: false,
        totalAmount: 0,
      },
    };

    Selector(selectProductsView)
      .expect(state)
      .toReturn({ products, error: false, loading: false });
  });

  it('should get the entire shop store', () => {
    const products = productFactory.buildList(10);
    const productsInCart = productFactory.buildList(1);
    const cart = cartItemFactoryList(1, productsInCart);
    const expected = cart.map((cartItem, index) => ({
      ...cartItem,
      ...products[index],
    }));

    const state: RootState = {
      shop: {
        products: entityFactory(...products, ...productsInCart),
        cart: entityFactory(...cart),
        error: false,
        loading: false,
        totalAmount: 0,
      },
    };

    Selector(selectCheckoutView).expect(state).toReturn(expected);
  });
});
