export const addItemToCart = (itemToAdd, cart) => {
  console.log('itemToAdd', itemToAdd);
  console.log('cart', cart);

  const itemId = itemToAdd._id;
  const cartItemExists = cart.find((cartItem) => cartItem?._id === itemId);
  const cartCopy = cart.map((cartItem) => cartItem);

  if (cartItemExists) {
    cart.forEach((cartItem, index) => {
      if (cartItem?._id === itemId) {
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
