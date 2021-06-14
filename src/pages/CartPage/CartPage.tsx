import { CheckoutDashboard, Layout } from '@components';
import { FC } from 'react';
import { PropsWithClassName } from '../../models/react';

export type CartPageProps = {
  disableBack?: boolean;
};

const CartPage: FC<PropsWithClassName<CartPageProps>> = ({
  className,
  disableBack,
}) => (
  <Layout
    title="Cart"
    footer="Make a Payment"
    className={className}
    disableBack={disableBack}
  >
    <CheckoutDashboard />
  </Layout>
);

export default CartPage;
