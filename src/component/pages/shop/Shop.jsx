import React, { useContext } from 'react';
import Layout from '../../shared/Layout';
import FeaturedProduct from '../../shared/FeaturedProduct';
import { ProductsContext } from '../../../context/productsContext';
import './Shop.styles.scss';

const Shop = () => {
  const { products } = useContext(ProductsContext);
  // const allProducts = products.map(product => (
  //   <FeaturedProduct {...product} key={product.id} />
  // ));

  return (
    <Layout>
      <div className="product-list-container">
        <h2 className="product-list-title">Shop</h2>
        <div className="product-list">
          {products.map(product => (
            <FeaturedProduct product={product} key={product.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
