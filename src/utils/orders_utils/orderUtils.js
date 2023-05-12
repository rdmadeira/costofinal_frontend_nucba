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
  /* const url =
    'http://127.0.0.1:5001/costofinal-backend-functions/us-central1/app/api/mailing'; */

  const url2 =
    'http://127.0.0.1:5001/costofinal-b391b/us-central1/app/api/mailing';
  await fetch(url2, {
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
    method: 'post',
    body: JSON.stringify(bodyData),
  }).then((res) => {
    alert('Enviado su pedido por Email');
    console.log(res.json());
  });
  return;
};
