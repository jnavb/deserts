import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectShop } from '../../store/selectors/shop';
import './TotalAmount.scss';

const TotalAmount: FC<{ className?: string }> = ({ className }) => {
  const { totalAmount } = useSelector(selectShop);
  return (
    <div className={'total-amount ' + (className ? className : '')}>
      <span className="total-amount__label">Total Amount</span>
      <span className="total-amount__price">{`$${totalAmount}`}</span>
    </div>
  );
};

export default TotalAmount;
