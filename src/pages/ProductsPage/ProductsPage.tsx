import { Shop } from '@actions';
import { Divider, Layout, ProductCard } from '@components';
import React, { FC, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { CartPage } from '..';
import { Product } from '../../models/shop';
import { path } from '../../routes/routes';
import { selectProductsView } from '../../store/selectors/shop';
import { isDesktop } from '../../utils/responsive';
import './ProductsPage.scss';

export interface ProductsPageProps {
  handleAddOneToCart: (payload: Product) => void;
  handleFavorite: (payload: { id: string }) => void;
}

const ProductsPage: FC<RouteComponentProps<any> & ProductsPageProps> = ({
  history,
  handleAddOneToCart,
  handleFavorite: handleToggleFavorite,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Shop.fetchProducts());
  }, [dispatch]);

  const { products, loading, error } = useSelector(selectProductsView);

  const productsCards = products.map((product) => {
    const handleAdd = () => {
      handleAddOneToCart(product);
    };
    const handleFavorite = () => {
      handleToggleFavorite({ id: product.id });
    };
    const handleContent = () => {
      if (isDesktop()) return;

      handleAddOneToCart(product);
      history.push(path.cart);
    };

    return (
      <ProductCard
        {...product}
        key={product.id}
        handleContent={handleContent}
        handleAdd={handleAdd}
        handleFavorite={handleFavorite}
      ></ProductCard>
    );
  });

  return (
    <div className="products-page">
      <Layout title="New product" className="products-page__products-section">
        <div className="products-page__products">{productsCards}</div>
        {error && <div>Ops! Something went wrong</div>}
        {loading && <div>...Loading</div>}
      </Layout>
      <Divider className="products-page__divider" />
      <CartPage className="products-page__cart-section" disableBack={true} />
    </div>
  );
};

const connector = connect(null, (dispatch) => {
  return {
    handleAddOneToCart: (product: Product) => {
      dispatch(Shop.addToCart({ product, quantity: 1 }));
    },
    handleFavorite: ({ id }: { id: string }) => {
      dispatch(Shop.toggleFavorites({ id }));
    },
  };
});

export default connector(withRouter(ProductsPage));
