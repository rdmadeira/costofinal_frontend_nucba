import { ADD_ORDER_TO_ORDERS } from './ordersActions';

export const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ORDER_TO_ORDERS:
      return action.payload;

    default:
      return state;
  }
};
