import { Shop } from '@actions';
import { Divider, Layout, ProductCard } from '@components';
import React, { FC, useEffect, FunctionComponent } from 'react';
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

 
const _ProductCardSmart: FunctionComponent<any> = ({
    history,
    handleAddOneToCart,
    handleToggleFavorite,
    ...product
  }) => {
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
      handleAdd={handleAdd}
      handleFavorite={handleFavorite}
      handleContent={handleContent}
    ></ProductCard>
  );
}

const ProductCardSmart = connector(withRouter(_ProductCardSmart));

const ProductsPage: FC<RouteComponentProps<any> & ProductsPageProps> = () => {
  console.log('Product Page');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Shop.fetchProducts());
  }, [dispatch]);

  const { products, loading, error } = useSelector(selectProductsView);

  const productsCards = products.map((product) => {
    return (
      <ProductCardSmart
        {...product}
        key={product.id}
      ></ProductCardSmart>
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

export default ProductsPage;
