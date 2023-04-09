import { ADD_ITEM_TO_CART } from './cartActions';

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...action.payload];
    /* return []; */
    default:
      return state;
  }
};
