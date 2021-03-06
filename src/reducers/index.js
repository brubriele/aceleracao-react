import { ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT, RESET_CART } from '../actions';

const initialState = {
  totalPrice: 0,
  totalAmount: 0,
  products: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        totalPrice: state.totalPrice + action.newProduct.amount * action.newProduct.price,
        totalAmount: state.totalAmount + action.newProduct.amount,
        products: [...state.products, action.newProduct],
      };
    case REMOVE_PRODUCT:
      let remove = state.products.find((product) => product.id === action.deletedProduct.id);

      return {
        ...state,
        totalPrice: state.totalPrice - remove.amount * remove.price,
        totalAmount: state.totalAmount - remove.amount,
        products: state.products.filter((product) => product.id !== action.deletedProduct.id),
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        totalPrice: state.totalPrice + action.product.amount * action.product.price,
        totalAmount: state.totalAmount + action.product.amount,
        products: state.products.map((product) => {
          if (product.id === action.product.id) {
            return {
              ...product,
              amount: product.amount + action.product.amount,
            };
          }

          return product;
        }),
      };
    case RESET_CART:
      return initialState;
    default:
      return state;
  }
};
