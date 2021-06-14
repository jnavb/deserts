import { createSelector } from 'reselect';
import { RootState } from '../../models/store';
import { cartAdapter, productsAdapter } from '../reducers/shop';

export const selectShop = (state: RootState) => state.shop;

const selectCartEntities = (state: RootState) => state.shop.cart;
const selectProductEntities = (state: RootState) => state.shop.products;

export const { selectById: selectCartItemById, selectAll: selectAllCartItems } =
  cartAdapter.getSelectors<RootState>(selectCartEntities);

export const { selectById: selectProductById, selectAll: selectAllProducts } =
  productsAdapter.getSelectors<RootState>(selectProductEntities);

export const selectCheckoutView = (state: RootState) =>
  selectAllCartItems(state).map((cartItem) => ({
    ...cartItem,
    ...selectProductById(state, cartItem.id),
  }));

export const selectProductsView = createSelector(
  selectAllProducts,
  (state) => state.shop,
  (products, { loading, error }) => ({ products, loading, error }),
);
