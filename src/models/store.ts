import { EntityState } from '@reduxjs/toolkit';
import { store } from '../store';
import { CartItem, Product } from './shop';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ShopState {
  cart: EntityState<CartItem>;
  products: EntityState<Product>;
  totalAmount: number;
  error: boolean;
  loading: boolean;
}
