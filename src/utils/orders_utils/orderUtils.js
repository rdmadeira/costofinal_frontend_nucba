export const createOrder = (userId, cart) => {
  const newOrder = {
    user: userId,
    items: cart.map((item) => ({ product: item._id, quantity: item.quantity })),
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
