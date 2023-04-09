import { useState, useEffect } from 'react';
import { getProducts } from '../utils/data_utils/dataUtils';

const useGetProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, [setProducts]);

  return { products, setProducts };
};

export default useGetProducts;
