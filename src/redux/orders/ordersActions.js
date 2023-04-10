export const ADD_ORDER_TO_ORDERS = 'ADD_ORDER_TO_ORDERS';

export const getOrdersAction = (order) => ({
  type: ADD_ORDER_TO_ORDERS,
  payload: order,
});
