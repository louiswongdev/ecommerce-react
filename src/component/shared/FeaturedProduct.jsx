import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { isInCart } from '../../helpers';
import { CartContext } from '../../context/cartContext';
import './FeaturedProduct.styles.scss';

const FeaturedProduct = ({ product, history }) => {
  const { addProduct, cartItems } = useContext(CartContext);
  const itemInCart = isInCart(product, cartItems);

  return (
    <div className="featured-product">
      <div
        className="featured-image"
        onClick={() => history.push(`/product/${product?.id}`)}
      >
        <img src={product?.imageUrl} alt="product" />
      </div>
      <div className="name-price">
        <h3>{product?.title}</h3>
        <p>$ {product?.price}</p>
        {itemInCart ? (
          <button
            className="button is-white nomad-btn"
            id="btn-white-outline"
            onClick={() => {}}
          >
            ADD MORE
          </button>
        ) : (
          <button
            className="button is-black nomad-btn"
            onClick={() => addProduct(product)}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};

export default withRouter(FeaturedProduct);
