import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  VStack,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { formatPrices } from '../utils/product_utils/product_utils';

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  return (
    <VStack>
      <Heading as="h6" size="sm">
        Mi Carrito
      </Heading>
      <TableContainer whiteSpace="pre-wrap">
        <Table>
          <TableCaption>Este carrito será agregado a sus pedidos.</TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center">CODIGO</Th>
              <Th textAlign="center">DESCIPCION</Th>
              <Th textAlign="center">PRECIO</Th>
              <Th textAlign="center">CANTIDAD</Th>
              <Th textAlign="center">SUBTOTAL</Th>
            </Tr>
            <Divider size="lg" orientation="horizontal" colorScheme={'blue'} />
          </Thead>
          <Tbody>
            {cart &&
              cart.map((cartItem) => {
                return (
                  <Tr key={cartItem.id + cartItem['CODIGO']}>
                    <Td textAlign="center">{cartItem.CODIGO}</Td>
                    <Td textAlign="center">{cartItem.MEDIDA}</Td>
                    <Td textAlign="center">{formatPrices(cartItem.PRECIO)}</Td>
                    <Td textAlign="center">{cartItem.quantity}</Td>
                    <Td textAlign="center">
                      {formatPrices(cartItem.PRECIO * cartItem.quantity)}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Button>Enviar pedido</Button>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default Cart;
