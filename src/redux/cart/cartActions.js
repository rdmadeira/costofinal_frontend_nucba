export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const RESET_CART = 'RESET_CART';
/* export const ADD_CANT_TO_ITEM = 'ADD_CANT_TO_ITEM';
 */
export const addItemToCartAction = (item) => ({
  type: ADD_ITEM_TO_CART,
  payload: item,
});
export const resetCartAction = () => ({
  type: RESET_CART,
});

/* export const addCantidadToItemAction = (item) => {
  return {
    type: ADD_CANT_TO_ITEM,
    payload: item,
  };
}; */
