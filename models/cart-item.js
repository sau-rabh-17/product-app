// Use plain object factory instead of class
export const createCartItem = (quantity, productPrice, productTitle, sum) => ({
  quantity,
  productPrice,
  productTitle, 
  sum
});

export default createCartItem;
