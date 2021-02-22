import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import Layout from '../shared/Layout';

import './Checkout.styles.scss';
import StripeCheckout from './stripe-checkout/StripeCheckout';

const Checkout = () => {
  const { itemCount, total, cartItems } = useContext(CartContext);
  const [shipping, setShipping] = useState(null);
  const addressShown = {
    display: shipping ? 'none' : 'block',
  };
  const cardShown = {
    display: shipping ? 'block' : 'none',
  };
  return (
    <Layout>
      <div className="checkout">
        <h2>Checkout Summary</h2>
        <h3>{`Total Items: ${itemCount}`}</h3>
        <h4>{`Amount to Pay: $${total}`}</h4>
        <StripeCheckout />
      </div>
    </Layout>
  );
};

export default Checkout;
