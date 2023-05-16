import { useState, useEffect } from 'react';
import { getProductsFromDB } from '../firebase/firestore';

const useGetProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProductsFromDB().then((res) => {
      setProducts(res);
    });
  }, [setProducts]);

  return { products, setProducts };
};

export default useGetProducts;
