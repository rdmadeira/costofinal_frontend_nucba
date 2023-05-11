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
  const url = 'http://localhost:3000/api/mailing';
  await fetch(url, {
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
