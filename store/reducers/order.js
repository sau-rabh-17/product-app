import { ADD_ORDER, SET_ORDERS } from "../actions/order";
import Order from "../../models/order";
import moment from "moment";

const initialState = {
    orders: []
};

const formatDate = () => {
    return moment().format("DD-MMMM-YYYY HH:mm:ss");
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                orders: action.orders,
            }
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toISOString(), // Formatted date string
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date, // Formatted date string
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder) // Use spread operator
            };
        default:
            return state;
    }
};
