export const isInCart = (product, cartItems) => {
  // debugger;
  return cartItems.find(item => item.id === product.id);
};
