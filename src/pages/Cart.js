import React, { useReducer } from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { formatPrices } from '../utils/product_utils/product_utils';
import { createOrder } from '../utils/orders_utils/orderUtils';
import { createOrderToDatabase } from '../firebase/firestore';
import { resetCartAction } from '../redux/cart/cartActions';
import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const initialState = {
  isLoading: false,
  isSuccessful: false,
  isError: false,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        isSuccessful: false,
        isError: false,
        isLoading: true,
      };
    case 'success':
      return {
        isSuccessful: true,
        isLoading: false,
        isError: false,
      };
    case 'error':
      return {
        isSuccess: false,
        isLoading: false,
        isError: true,
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [estado, redDispatch] = useReducer(cartReducer, initialState);
  const navigate = useNavigate();

  const createOrderHandle = () => {
    const newOrder = createOrder(user.uid, cart);
    redDispatch({ type: 'loading' });
    createOrderToDatabase(user.uid, newOrder).then((res) => {
      if (res.isSuccess) {
        redDispatch({ type: 'success' });
        setTimeout(() => {
          dispatch(resetCartAction());
          redDispatch({ type: 'reset' });
          navigate('/orders');
        }, 2000);
      }
    });
  };
  return (
    <VStack>
      <Heading as="h6" size="sm" color="gray.500">
        Mi Carrito
      </Heading>
      <TableContainer whiteSpace="pre-wrap">
        <Table variant="simple" size="sm">
          <TableCaption>
            {cart.length > 0
              ? 'Este carrito será agregado a sus pedidos.'
              : 'No hay productos en el carrito'}
          </TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center">CODIGO</Th>
              <Th textAlign="center">DESCIPCION</Th>
              <Th textAlign="center">PRECIO</Th>
              <Th textAlign="center">CANTIDAD</Th>
              <Th textAlign="center">SUBTOTAL</Th>
            </Tr>
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
          <Tfoot></Tfoot>
        </Table>
        <Divider size="lg" orientation="horizontal" colorScheme={'blue'} />
        {cart.length > 0 && (
          <Button
            isDisabled={estado.isLoading || cart.length === 0}
            rightIcon={
              estado.isLoading ? (
                <Spinner />
              ) : estado.isSuccessful ? (
                <CheckIcon />
              ) : estado.isError ? (
                <WarningTwoIcon />
              ) : null
            }
            variant={estado.isSuccessful ? 'solid' : 'outline'}
            colorScheme="green"
            float="right"
            onClick={createOrderHandle}>
            Enviar pedido
          </Button>
        )}
      </TableContainer>
    </VStack>
  );
};

export default Cart;
