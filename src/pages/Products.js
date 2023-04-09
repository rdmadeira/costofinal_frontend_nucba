import React from 'react';
import {
  VStack,
  Box,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  AccordionIcon,
  Heading,
  Divider,
} from '@chakra-ui/react';
import useGetProducts from '../hooks/useGetProducts';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/product_grid/ProductGrid';

const Products = () => {
  const { products } = useGetProducts();
  let { product: productType } = useParams();
  productType = productType.toUpperCase().replace(/-/g, ' ');

  return (
    <VStack
      spacing={'4'}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      w="100%">
      <Heading as="h6" size={'md'} color="gray.400">
        {products && productType}
      </Heading>
      <Divider />

      <Box width="100%">
        <Accordion allowToggle>
          {products &&
            Object.keys(products[productType]).map((product) => {
              return (
                <AccordionItem key={product}>
                  <AccordionButton
                    _expanded={{ bg: 'green.400', color: 'white' }}>
                    <Box>{product}</Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <VStack>
                      <ProductGrid product={products[productType][product]} />
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
        </Accordion>
      </Box>
    </VStack>
  );
};

export default Products;
