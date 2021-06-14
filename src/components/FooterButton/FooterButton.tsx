import { FC } from 'react';
import './FooterButton.scss';

export interface FooterButtonProps {
  title: string;
}

const FooterButton: FC<FooterButtonProps> = ({ title: string }) => {
  return <button className="footer-button">Make a payment</button>;
};

export default FooterButton;
