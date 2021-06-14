import { ProductsPage } from '@pages';
import { importAsyncPage } from '../utils/asyncImport';

export const path = {
  products: '/',
  cart: '/cart',
  favorites: '/favorites',
};

const routes: any[] = [
  {
    path: path.products,
    component: ProductsPage,
  },
  {
    path: path.cart,
    component: importAsyncPage('CartPage'),
  },
  {
    path: path.favorites,
    component: importAsyncPage('FavoritesPage'),
  },
];

export default routes;
