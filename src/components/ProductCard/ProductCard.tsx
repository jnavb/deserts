import { FC, SyntheticEvent } from 'react';
import { HeartIcon } from '..';
import { PropsWithClassName } from '../../models/react';
import { Product } from '../../models/shop';
import './ProductCard.scss';

export type ProductCardProps = Product & {
  handleFavorite: () => void;
  handleAdd: () => void;
  handleContent: () => void;
};

const withStopPropagation = (fn: () => void) => (e: SyntheticEvent) => {
  e.stopPropagation();
  fn();
};

const ProductCard: FC<PropsWithClassName<ProductCardProps>> = ({
  productName,
  productDescription,
  price,
  stock,
  image_url,
  className,
  favorite,
  handleAdd,
  handleFavorite,
  handleContent,
}) => {
  return (
    <div
      className={'product-card ' + (className || '')}
      onClick={handleContent}
    >
      <button
        className={
          'product-card__favorite ' +
          (favorite ? 'product-card__favorite--active' : '')
        }
        onClick={withStopPropagation(handleFavorite)}
      >
        <HeartIcon />
      </button>

      <div className="product-card__thumbnail">
        <img
          className="product-card__image"
          src={image_url}
          alt={`Thumbnail ${productName}`}
        />
      </div>
      <div className="product-card__content">
        <div className="product-card__section-1">
          <div className="product-card__title">{productName}</div>
          <div className="product-card__price">{`$${price}`}</div>
        </div>
        <div className="product-card__description">{productDescription}</div>
        <div className="product-card__section-2">
          <div className="product-card__stock">{`${stock} Left`}</div>
          <button
            className="product-card__btn"
            onClick={withStopPropagation(handleAdd)}
          >
            + ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
