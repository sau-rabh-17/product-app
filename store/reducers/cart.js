import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { createCartItem } from "../../models/cart-item";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price, title } = action.product;
      const existingItem = state.items[id];

      let updatedItem;
      if (existingItem) {
        updatedItem = createCartItem(
          existingItem.quantity + 1,
          price,
          title,
          existingItem.sum + price
        );
      } else {
        updatedItem = createCartItem(1, price, title, price);
      }

      return {
        ...state,
        items: { ...state.items, [id]: updatedItem },
        totalAmount: state.totalAmount + price
      };
    
    case REMOVE_FROM_CART:
      const productId = action.pid;
      const selectedCartItem = state.items[productId];
      
      // Guard against missing items
      if (!selectedCartItem) {
        return state;
      }

      const updatedItems = { ...state.items };
      const newTotalAmount = state.totalAmount - selectedCartItem.productPrice;

      if (selectedCartItem.quantity > 1) {
        // Reduce quantity
        updatedItems[productId] = createCartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
      } else {
        // Remove item completely
        delete updatedItems[productId];
      }

      return { 
        ...state,
        items: updatedItems,
        totalAmount: newTotalAmount >= 0 ? newTotalAmount : 0 // Prevent negative amounts
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if(!state.items[action.pid]){
        return state;
      }
      const updatedItemss = {...state.items};
      const itemTotal = state.items[action.pid].sum;
      delete updatedItemss[action.pid];
      return {
        ...state,
        items: updatedItemss,
        totalAmount: state.totalAmount - itemTotal,
      }

    default:
      return state;
  }
};