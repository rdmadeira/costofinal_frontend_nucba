import { v4 as uuidv4 } from 'uuid';

export const createOrder = (userId, cart) => {
  const createdAt = new Date().toLocaleString();
  const newOrder = {
    user: userId,
    items: cart,
    createdAt,
    id: uuidv4(),
  };
  return newOrder;
};
