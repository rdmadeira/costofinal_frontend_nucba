export const addItemToCart = (itemToAdd, cart) => {
  const itemId = itemToAdd.id;
  const cartItemExists = cart.find((cartItem) => cartItem?.id === itemId);
  const cartCopy = cart.map((cartItem) => cartItem);

  if (cartItemExists) {
    cart.forEach((cartItem, index) => {
      if (cartItem?.id === itemId) {
        cartCopy[index] = {
          ...cartItem,
          quantity: cartItem.quantity + itemToAdd.quantity,
        };
      }
    });
    return cartCopy;
  } else {
    return [...cart, itemToAdd];
  }
};
