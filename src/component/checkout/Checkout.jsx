import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import { UserContext } from '../../context/userContext';
import Layout from '../shared/Layout';

import './Checkout.styles.scss';
import CustomCheckout from './custom-checkout/CustomCheckout';
import ShippingAddress from './custom-checkout/ShippingAddress';
// import StripeCheckout from './stripe-checkout/StripeCheckout';

const Checkout = ({ history: { push } }) => {
  const { user } = useContext(UserContext);
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
        {/* <StripeCheckout /> */}
        <div style={addressShown}>
          <ShippingAddress setShipping={setShipping} />
        </div>
        <div style={cardShown}>
          {/* <CustomCheckout shipping={shipping} cartItems={cartItems} /> */}
          {user ? <CustomCheckout {...{ shipping, cartItems }} /> : push('/signin')}
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Checkout);
