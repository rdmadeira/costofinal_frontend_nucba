import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
} from '@chakra-ui/react';
import { formatPrices } from '../../utils/product_utils/product_utils';
import CartLine from './CartLine';

const CartTable = () => {
  const cart = useSelector((store) => store.cart);

  return (
    <Table variant="simple" size="sm">
      <TableCaption>
        {cart.length > 0
          ? 'Este carrito será agregado a sus pedidos.'
          : 'No hay productos en el carrito'}
      </TableCaption>
      {cart.length > 0 && (
        <>
          <Thead>
            <Tr>
              <Th textAlign="center">CODIGO</Th>
              <Th textAlign="center">DESCRIPCION</Th>
              <Th textAlign="center">PRECIO/ UN.</Th>
              <Th textAlign="center">CANTIDAD</Th>
              <Th textAlign="center">SUBTOTAL</Th>
            </Tr>
          </Thead>

          <Tbody borderBottom="solid 2px" borderColor="gray.300">
            {cart &&
              cart.map((cartItem) => {
                return (
                  <CartLine
                    key={cartItem.id + cartItem['CODIGO']}
                    cartItem={cartItem}
                    formatPrices={formatPrices}
                  />
                );
              })}
          </Tbody>
          <Tfoot>
            {
              <Tr>
                <Th></Th>
                <Th></Th>
                <Th></Th>
                <Th>Total del carrito: </Th>
                <Th>
                  {formatPrices(
                    cart.reduce(
                      (acc, curr) => acc + curr.PRECIO * curr.quantity,
                      0
                    )
                  )}
                </Th>
              </Tr>
            }
          </Tfoot>
        </>
      )}
    </Table>
  );
};

export default CartTable;
