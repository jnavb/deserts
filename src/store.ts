import { configureStore } from '@reduxjs/toolkit';
import { shopReducer } from './store/reducers/shop';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
  },
});
