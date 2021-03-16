import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { UserContext } from '../../../context/userContext';
import { fetchFromAPI } from '../../../helpers';

const CustomCheckout = ({ shipping, cartItems, history: { push } }) => {
  // console.log('shipping:', shipping);
  // console.log('cartItems:', cartItems);
  const { user } = useContext(UserContext);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [cards, setCards] = useState(null);
  const [paymentCard, setPaymentCard] = useState('');
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    console.log('Cards saved: ', cards);
    console.log('payment card: ', paymentCard);
    console.log('client_secret: ', clientSecret);
    console.log('isSavingCard: ', isSavingCard);

    const items = cartItems.map(item => ({
      price: item.price,
      quantity: item.quantity,
    }));

    if (user) {
      const savedCards = async () => {
        try {
          const cardsList = await fetchFromAPI('get-payment-methods', {
            method: 'GET',
          });

          setCards(cardsList);
        } catch (error) {
          console.log(error);
        }
      };

      savedCards();
    }

    // make sure we have shipping address before creating a Stripe Payment Intent
    if (shipping) {
      const body = {
        cartItems: items,
        shipping: {
          name: shipping.name,
          address: {
            line1: shipping.address,
          },
        },
        description: 'payment intent for nomad shop',
        receipt_email: shipping.email,
      };

      const customCheckout = async () => {
        const { clientSecret, id } = await fetchFromAPI('create-payment-intent', {
          body,
        });

        // set client_secret returned from paymentIntents.create({})
        // we'll need this to call stripe.confirmCardPayment() in handleCheckout
        setClientSecret(clientSecret);
        // set paymentIntent.id returned from server for use in savedCardCheckout func
        setPaymentIntentId(id);
      };

      customCheckout();
    }
  }, [cartItems, shipping, user]);

  // handle checkout for newly entered credit card info
  const handleCheckout = async () => {
    setProcessing(true);

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentCard
          ? paymentCard
          : {
              card: elements.getElement(CardNumberElement),
            },
        setup_future_usage: isSavingCard ? 'off_session' : '',
      });
      push('/success');
    } catch (error) {
      setError(`Payment Failed: ${error.message}`);
      console.log(error);
    }
  };

  const cardHandleChange = e => {
    const { error } = e;
    setError(error ? error.message : '');
  };

  const cardStyle = {
    style: {
      base: {
        color: '#000',
        fontFamily: 'Roboto, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#606060',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  let cardOption;

  if (cards) {
    cardOption = cards.map(card => {
      const {
        card: { brand, last4, exp_month, exp_year },
      } = card;
      return (
        <option key={card.id} value={card.id}>
          {`${brand}/ **** **** **** **** ${last4} ${exp_month}/${exp_year}`}
        </option>
      );
    });
    // make "Select a card" the default with value of ""
    cardOption.unshift(
      <option key="Select a card" value="">
        Select A Card
      </option>,
    );
  }

  return (
    <div>
      {user && cards && cards.length > 0 && (
        <div>
          <h4>Pay with saved card</h4>
          <select
            className="saved-card-select"
            value={paymentCard}
            onChange={e => setPaymentCard(e.target.value)}
          >
            {cardOption}
          </select>
          {/* <button
            type="submit"
            disabled={processing || !paymentCard}
            className="button is-black nomad-btn submit saved-card-btn"
            onClick={() => savedCardCheckout()}
          >
            {processing ? 'PROCESSING' : 'PAY WITH SAVED CARD'}
          </button> */}
        </div>
      )}
      {!paymentCard && (
        <>
          <h4>Enter Payment Details</h4>
          <div className="stripe-card">
            <CardNumberElement
              className="card-element"
              options={cardStyle}
              onChange={cardHandleChange}
            />
          </div>
          <div className="stripe-card">
            <CardExpiryElement
              className="card-element"
              options={cardStyle}
              onChange={cardHandleChange}
            />
          </div>
          <div className="stripe-card">
            <CardCvcElement
              className="card-element"
              options={cardStyle}
              onChange={cardHandleChange}
            />
          </div>
        </>
      )}
      {user && !paymentCard && (
        <div className="save-card">
          <label>Save Card</label>
          <input
            type="checkbox"
            checked={isSavingCard}
            onChange={e => setIsSavingCard(e.target.checked)}
          />
        </div>
      )}
      <div className="submit-btn">
        <button
          disabled={processing}
          className="button is-black nomad-btn submit"
          onClick={() => handleCheckout()}
        >
          {processing ? 'PROCESSING' : 'PAY'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default withRouter(CustomCheckout);
