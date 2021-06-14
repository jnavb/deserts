import { FC } from 'react';
import { PropsWithClassName } from '../../models/react';
import './Divider.scss';

export interface DividerProps {}

const Divider: FC<PropsWithClassName<DividerProps>> = ({ className }) => {
  return <div className={`divider ${className ? className : ''}`}></div>;
};

export default Divider;
