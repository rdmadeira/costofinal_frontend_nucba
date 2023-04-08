import React, { useState, useEffect /* , useCallback */ } from 'react';
import { VStack, Spinner, Box } from '@chakra-ui/react';
import { getProducts } from '../utils/data_utils/dataUtils';

const Products = () => {
  /* const [isLoadingProducts, setisLoadingProducts] = useState(true); */
  const [products, setProducts] = useState(null);

  /* const getProductsCB = useCallback(() => getProducts(), []); */
  console.log(products);
  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, [setProducts]);

  return (
    <VStack
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <h4>Products</h4>
      <Box>{!products && <Spinner />}</Box>
    </VStack>
  );
};

export default Products;
