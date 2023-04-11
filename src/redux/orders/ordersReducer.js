import { GET_ORDERS } from './ordersActions';

export const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload;

    default:
      return state;
  }
};
