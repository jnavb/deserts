import {
  CaseReducer,
  createEntityAdapter,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';
import { CartItem, Product } from '../../models/shop';
import { ShopState } from '../../models/store';
import {
  addToCart as addToCartAction,
  fetchProducts,
  removeFromCart as removeFromCartAction,
  toggleFavorites as toggleFavoritesAction,
} from '../actions/shop';

export const cartAdapter = createEntityAdapter<CartItem>({
  selectId: ({ id }) => id,
});

export const productsAdapter = createEntityAdapter<Product>({
  selectId: ({ id }) => id,
});

const { selectById: selectCartItemById } = cartAdapter.getSelectors();
const { selectById: selectProductById } = productsAdapter.getSelectors();

const initialState: ShopState = {
  cart: cartAdapter.getInitialState(),
  totalAmount: 0,
  products: productsAdapter.getInitialState(),
  error: false,
  loading: false,
};

const addProducts: CaseReducer<ShopState, PayloadAction<Product[]>> = (
  state,
  { payload = [] },
) => {
  state.loading = false;
  productsAdapter.setAll(state.products, payload);
};

const addToCart: CaseReducer<
  ShopState,
  PayloadAction<{ product: Product; quantity: number }>
> = (state, { payload: { product, quantity } }) => {
  const { id, price, stock: previousStock } = product;
  const notAvailableStock = previousStock < 1;

  if (notAvailableStock) return;

  const previousQuantity = selectCartItemById(state.cart, id)?.quantity || 0;
  const newQuantity = (previousQuantity || 0) + quantity;

  cartAdapter.setOne(state.cart, { id, quantity: newQuantity });
  productsAdapter.updateOne(state.products, {
    id,
    changes: { stock: previousStock - quantity },
  });
  state.totalAmount += quantity * price;
};

const removeFromCart: CaseReducer<
  ShopState,
  PayloadAction<{ product: Product; quantity: number }>
> = (state, { payload: { product, quantity } }) => {
  const { id, price, stock: previousStock } = product;
  const previousQuantity = selectCartItemById(state.cart, id)?.quantity || 0;
  const newQuantity = (previousQuantity || 0) - quantity;

  const nonExistingCartItems = !selectCartItemById(state.cart, id);
  if (nonExistingCartItems) return;

  newQuantity > 0
    ? cartAdapter.setOne(state.cart, { id, quantity: newQuantity })
    : cartAdapter.removeOne(state.cart, id);
  productsAdapter.updateOne(state.products, {
    id,
    changes: { stock: previousStock + quantity },
  });
  state.totalAmount -= quantity * price;
};

const toggleFavorites: CaseReducer<ShopState, PayloadAction<{ id: string }>> = (
  state,
  { payload: { id } },
) => {
  const previousFavorite = selectProductById(state.products, id)?.favorite || 0;
  productsAdapter.updateOne(state.products, {
    id,
    changes: { favorite: !previousFavorite },
  });
};

const activateLoading: CaseReducer<ShopState, PayloadAction<unknown>> = (
  state,
) => {
  state.loading = true;
};

export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCartAction, addToCart)
    .addCase(removeFromCartAction, removeFromCart)
    .addCase(toggleFavoritesAction, toggleFavorites)
    .addCase(fetchProducts.pending, activateLoading)
    .addCase(fetchProducts.fulfilled, addProducts);
});
