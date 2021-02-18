import React, { createContext, useMemo, useReducer } from 'react';
import cartReducer from './cartReducer';

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  itemCount: 0,
  total: 0,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addProduct = product =>
    dispatch({ type: 'ADD_ITEM', payload: product });

  // const contextValues = {
  //   ...state,
  // };

  const contextValues = useMemo(() => ({ ...state, addProduct }), [state]);

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
