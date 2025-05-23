
import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/products";
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from "../actions/product";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                availableProducts: action.products,
                userProducts: action.products,
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.pid
                ),
            }

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                "u1",
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            );
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }

        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => action.pid === prod.id);
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
            )
            const updatedUserProduct = [...state.userProducts];
            updatedUserProduct[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProduct,
            }
        default:
            return state;
    }
};