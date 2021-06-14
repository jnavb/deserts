import { Shop } from '.';
import { productFactory } from '../../utils/test';

describe('[Redux] Shop actions', () => {
  it('should create an action to add items to cart', () => {
    const product = productFactory.build();

    const expectedAction = {
      type: Shop.ActionType.ADD_TO_CART,
      payload: { product, quantity: 2 },
    };

    expect(Shop.addToCart({ product, quantity: 2 })).toEqual(expectedAction);
  });

  it('should create an action to remove items from cart', () => {
    const product = productFactory.build();

    const expectedAction = {
      type: Shop.ActionType.REMOVE_FROM_CART,
      payload: { product, quantity: 2 },
    };

    expect(Shop.removeFromCart({ product, quantity: 2 })).toEqual(
      expectedAction,
    );
  });

  it('should create an action to toggle a user favorite product', () => {
    const { id } = productFactory.build();

    const expectedAction = {
      type: Shop.ActionType.TOGGLE_FAVORITES,
      payload: { id },
    };

    expect(Shop.toggleFavorites({ id })).toEqual(expectedAction);
  });
});
