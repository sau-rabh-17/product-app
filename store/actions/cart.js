export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// Pass explicit properties instead of whole product
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  // payload: {  // Standard Redux convention: use 'payload'
  //   id: product.id,
  //   price: product.price,
  //   title: product.title
  // }
  product: product,
});

export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId};
}