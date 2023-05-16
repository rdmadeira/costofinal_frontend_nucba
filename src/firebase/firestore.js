import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createOrderToDatabase = async (userId, newOrder) => {
  const userOrderRef = collection(db, 'orders', userId, userId);
  const ordersRef = doc(userOrderRef, newOrder.id);
  let createDocReturn = { isSuccess: null, message: null };

  await setDoc(ordersRef, newOrder)
    .then(() => {
      createDocReturn.isSuccess = true;
    })
    .catch((error) => {
      createDocReturn.isSuccess = false;
      createDocReturn.message = error.code;
      throw new Error(error);
    });
  return createDocReturn;
};

export const getOrders = async (userId) => {
  const userOrderRef = collection(db, 'orders', userId, userId);
  let orders = { isError: null, items: [] };

  await getDocs(userOrderRef)
    .then((querySnapshot) => {
      const docs = querySnapshot.docs.map((query) => query.data());
      orders = { isError: false, items: docs };
      return;
    })
    .catch((err) => {
      orders = { isError: true, items: [], message: err.code };
      return;
    });

  return orders;
};

export const getProductsFromDB = async () => {
  const products = {};
  const productsCollection = collection(db, 'products');
  (await getDocs(productsCollection)).forEach(
    (doc) => (products[doc.id] = doc.data())
  );
  console.log(products);
  return products;
};
