import { CartItem } from '@components';
import { FC } from 'react';
import { connect, useSelector } from 'react-redux';
import TotalAmount from '../../components/TotalAmount/TotalAmount';
import { Product } from '../../models/shop';
import { Shop } from '../../store/actions';
import { selectCheckoutView } from '../../store/selectors/shop';
import './CheckoutDashboard.scss';

export type CheckoutDashboardProps = {
  handleAddOneToCart: (id: Product) => () => void;
  handleRemoveOneFromCart: (id: Product) => () => void;
};

const CheckoutDashboard: FC<CheckoutDashboardProps> = ({
  handleAddOneToCart,
  handleRemoveOneFromCart,
}) => {
  const cartItems = useSelector(selectCheckoutView);

  return (
    <div className="checkout-dashboard">
      <div className="checkout-dashboard__items">
        {cartItems.map((product) => {
          const { id, productName, image_url, quantity, price } = product;
          return (
            <CartItem
              key={id}
              title={productName || ''}
              imageSrc={image_url || ''}
              price={price || 0}
              quantity={quantity}
              handleAddOneToCart={handleAddOneToCart(product as Product)}
              handleRemoveOneFromCart={handleRemoveOneFromCart(
                product as Product,
              )}
            ></CartItem>
          );
        })}
        <TotalAmount className="checkout-dashboard__total-amount" />
      </div>
    </div>
  );
};

const connector = connect(null, (dispatch) => {
  return {
    handleAddOneToCart: (product: Product) => () => {
      dispatch(Shop.addToCart({ product, quantity: 1 }));
    },
    handleRemoveOneFromCart: (product: Product) => () => {
      dispatch(Shop.removeFromCart({ product, quantity: 1 }));
    },
  };
});

export default connector(CheckoutDashboard);
