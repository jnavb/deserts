import { Counter } from '@components';
import { FC } from 'react';
import './CartItem.scss';

export interface CartItemProps {
  title: string;
  price: number;
  imageSrc: string;
  quantity: number;
  handleAddOneToCart: () => void;
  handleRemoveOneFromCart: () => void;
}

const CartItem: FC<CartItemProps> = ({
  title,
  price,
  imageSrc,
  quantity,
  handleRemoveOneFromCart,
  handleAddOneToCart,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item__thumbnail">
        <img src={imageSrc} alt="Product Thumbnail" />
      </div>
      <div className="cart-item__content">
        <div className="cart-item__title">{title}</div>
        <div className="cart-item__price">{`$${price}`}</div>
        <Counter
          quantity={quantity}
          onDecrement={handleRemoveOneFromCart}
          onIncrement={handleAddOneToCart}
        ></Counter>
      </div>
    </div>
  );
};

export default CartItem;
