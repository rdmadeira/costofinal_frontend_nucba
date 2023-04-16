import { ADD_ITEM_TO_CART, UPDATE_CART, RESET_CART } from './cartActions';

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...action.payload];
    case UPDATE_CART:
      return [...action.payload];

    case RESET_CART:
      return [];

    default:
      return state;
  }
};
