import { FC } from 'react';
import './IconButton.scss';

export interface BackButtonProps {
  src: string;
  onClick: () => void;
  className?: string;
}

const IconButton: FC<BackButtonProps> = ({ src, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <img src={src} alt="Icon button" />
    </button>
  );
};

export default IconButton;
