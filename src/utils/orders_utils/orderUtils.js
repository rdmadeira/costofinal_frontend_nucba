import { v4 as uuidv4 } from 'uuid';

export const createOrder = (userId, cart) => {
  const createdAt = new Date().toLocaleString();
  const newOrder = {
    user: userId,
    items: cart,
    createdAt,
    id: uuidv4(),
    status: 'pending',
  };
  return newOrder;
};

export const sendMail = async (bodyData) => {
  const url =
    'https://us-central1-costofinal-b391b.cloudfunctions.net/app/api/mailing';

  /* const url2 =
    'https://us-central1-costofinal-b391b.cloudfunctions.net/app';
  */

  await fetch(url, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },

    method: 'POST',
    body: JSON.stringify(bodyData),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new Error(err);
    });

  return;
};
