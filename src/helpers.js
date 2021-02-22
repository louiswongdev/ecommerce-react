export const isInCart = (product, cartItems) => {
  // debugger;
  return cartItems.find(item => item.id === product.id);
};

const API = 'http://localhost:8080';

export async function fetchFromAPI(endpoint, opts) {
  // defaults for method and body
  const { method, body } = { method: 'POST', body: null, ...opts };
  console.log('body:', body);

  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}
