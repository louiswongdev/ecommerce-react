import React, { useContext } from 'react';
// import { isInCart } from '../../helpers';

import { withRouter } from 'react-router-dom';
import './FeaturedProduct.styles.scss';

const FeaturedProduct = ({ title, imageUrl, price }) => {
  return (
    <div className="featured-product">
      <div
        className="featured-image"
        // onClick={() => history.push(`/product/${id}`)}
      >
        <img src={imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h3>{title}</h3>
        <p>$ {price}</p>
        <button className="button is-black nomad-btn">ADD TO CART</button>
        {/* { 
          !itemInCart && 
          <button 
            className='button is-black nomad-btn'
            onClick={() => addProduct(product)}>
              ADD TO CART</button>
        }
        {
          itemInCart &&
          <button 
            className='button is-white nomad-btn'
            id='btn-white-outline'
            onClick={()=> increase(product)}>
              ADD MORE</button>
        } */}
      </div>
    </div>
  );
};

export default withRouter(FeaturedProduct);
