export const createOrder = (userId, cart) => {
  const newOrder = {
    user: userId,
    items: cart.map((item) => ({ product: item._id, quantity: item.quantity })),
  };
  return newOrder;
};

export const sendMail = async (bodyData) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  await fetch(baseUrl + 'mailing', {
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
