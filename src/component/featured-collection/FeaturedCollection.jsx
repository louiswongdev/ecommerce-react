import React, { useContext } from 'react';
import { ProductsContext } from '../../context/productsContext';
import FeaturedProduct from '../shared/FeaturedProduct';

const FeaturedCollection = () => {
  const { products } = useContext(ProductsContext);
  // const productItems = products
  //   .filter((product, i) => i < 4)
  //   .map(product => <FeaturedProduct {...product} key={product.id} />);

  // console.log(productItems);
  return (
    <div className="featured-collection container">
      <h2 className="featured-section-title">Featured Collection</h2>
      <div className="products">
        {products
          .filter((_, i) => i < 4)
          .map(product => (
            // <FeaturedProduct {...product} key={product.id} />
            <FeaturedProduct product={product} key={product.id} />
          ))}
      </div>
    </div>
  );
};

export default FeaturedCollection;
