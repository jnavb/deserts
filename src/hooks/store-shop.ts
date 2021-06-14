import { useDispatch } from 'react-redux';
import { Product } from '../models/shop';
import { AppDispatch } from '../models/store';
import { addToCart, removeFromCart } from '../store/actions/shop';

export const useHandleAddOneToCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (product: Product) => () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };
};

export const useHandleRemoveOneToCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (product: Product) => () => {
    dispatch(removeFromCart({ product, quantity: 1 }));
  };
};
