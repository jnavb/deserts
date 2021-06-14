import { FC } from 'react';
import './Counter.scss';

export interface CounterProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: FC<CounterProps> = ({ onDecrement, onIncrement, quantity }) => {
  return (
    <div className="counter">
      <button className="counter__button" onClick={onDecrement}>
        -
      </button>
      <span className="counter__label">{quantity}</span>
      <button className="counter__button" onClick={onIncrement}>
        +
      </button>
    </div>
  );
};

export default Counter;
