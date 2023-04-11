export const GET_ORDERS = 'GET_ORDERS';

export const getOrdersAction = (order) => ({
  type: GET_ORDERS,
  payload: order,
});
