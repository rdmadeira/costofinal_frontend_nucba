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
import useGetSubCats from '../hooks/useGetSubCats';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/product_grid/ProductGrid';

const Products = () => {
  const { products } = useGetProducts();
  let { product: productType } = useParams();
  /* productType = productType.toUpperCase().replace(/-/g, ' '); */
  const { data: subCategoriesData } = useGetSubCats(productType);

  return (
    <VStack
      spacing={'4'}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      w="100%"
      py={'5'}
      px={'10'}>
      <Heading as="h6" size={'md'} color="#4146a3b5">
        {products && productType}
      </Heading>
      <Divider />

      <Box width="100%">
        <Accordion allowToggle>
          {subCategoriesData?.data?.map((subCat) => {
            return (
              <AccordionItem key={subCat}>
                <AccordionButton
                  _expanded={{ bg: 'green.400', color: 'white' }}>
                  <Box>{subCat.name}</Box>
                  <AccordionIcon />
                </AccordionButton>
                {}
                <AccordionPanel>
                  <VStack>
                    {/* <ProductGrid
                      product={products[productType][product]}
                      productType={productType}
                    /> */}
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
