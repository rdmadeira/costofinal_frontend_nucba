import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Th,
  Tr,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import ProductLine from './ProductLine';

const ProductGrid = ({ product }) => {
  return (
    <TableContainer width="100%" whiteSpace={'pre-wrap'}>
      <Table size="sm">
        <TableCaption>Elijas sus productos</TableCaption>
        <Thead>
          <Tr>
            <Th width="10%">CODIGO</Th>
            <Th width="35%">MEDIDA</Th>
            <Th width="20%">PRECIO/ UN.</Th>
            <Th width="25%">CANTIDAD</Th>
            <Th width="10%">AGREGAR</Th>
          </Tr>
        </Thead>
        <Tbody>
          {product.map((subProd) => {
            return (
              <ProductLine
                subProd={subProd}
                key={subProd['CODIGO'] + subProd.id}
              />
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>CODIGO</Th>
            <Th>MEDIDA</Th>
            <Th>PRECIO</Th>
            <Th>CANTIDAD</Th>
            <Th>AGREGAR</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ProductGrid;
