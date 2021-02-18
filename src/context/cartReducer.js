import React, { createContext, useReducer } from 'react';

export const sumItems = cartItems => {
  return {
    itemCount: cartItems.reduce((acc, prod) => acc + prod.quantity, 0),
    total: cartItems.reduce((acc, prod) => acc + prod.price * prod.quantity, 0),
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let newCartItems = [];
      // if item is not in cart yet, give it quantity of 1
      if (!state.cartItems.find(item => item.id === action.payload.id)) {
        newCartItems = [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: 1,
          },
        ];
      }

      return {
        ...state,
        cartItems: newCartItems,
        ...sumItems(newCartItems),
      };
    default:
      return state;
  }
};

export default cartReducer;
