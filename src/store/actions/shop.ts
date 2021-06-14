import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../api/client';
import { Product } from '../../models/shop';

export enum ActionType {
  ADD_TO_CART = '[Shop] Add to cart',
  REMOVE_FROM_CART = '[Shop] Remove from cart',
  TOGGLE_FAVORITES = '[User] Toggle Favorites',
  FETCH_PRODUCTS = '[API] Fetch Products',
}

export const addToCart = createAction<{ product: Product; quantity: number }>(
  ActionType.ADD_TO_CART,
);

export const removeFromCart = createAction<{
  product: Product;
  quantity: number;
}>(ActionType.REMOVE_FROM_CART);

export const toggleFavorites = createAction<{ id: string }>(
  ActionType.TOGGLE_FAVORITES,
);

export const fetchProducts = createAsyncThunk(ActionType.FETCH_PRODUCTS, () =>
  get<Product[]>('/grocery')
    .then((p) => p.slice(0, 50))
    .catch(() => []),
);
