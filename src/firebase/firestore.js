import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createOrderToDatabase = async (userId, newOrder) => {
  const userOrderRef = collection(db, 'orders', userId, userId);
  const ordersRef = doc(userOrderRef, newOrder.id);
  const createdAtTS = serverTimestamp();
  const newOrderWithTimestamp = { ...newOrder, createdAtTS };
  let createDocReturn = { isSuccess: null, message: null };

  await setDoc(ordersRef, newOrderWithTimestamp)
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

  await getDocs(query(userOrderRef, orderBy('createdAtTS', 'desc')))
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

  return products;
};

export const getProductsArrayToMenu = async () => {
  const products = [];
  const productsCollection = collection(db, 'products');
  (await getDocs(productsCollection)).forEach((doc) => {
    return products.push(doc.id);
  });

  products.sort(function (a, b) {
    if (a != 'FERRETERIA' && b == 'FERRETERIA') {
      return -1;
    } else {
      return 0;
    }
  });

  return products;
};
