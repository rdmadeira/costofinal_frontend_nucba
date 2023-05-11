import React, { useReducer } from 'react';
import {
  TableContainer,
  Heading,
  VStack,
  Button,
  Divider,
  Spinner,
  ButtonGroup,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, sendMail } from '../utils/orders_utils/orderUtils';
import { createOrderToDatabase } from '../firebase/firestore';
import { resetCartAction } from '../redux/cart/cartActions';
import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CartTable from '../components/cart/CartTable';

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
    const orderDataToMail = {
      ...newOrder,
      email: user.email,
      name: user.nombre,
    };
    redDispatch({ type: 'loading' });
    createOrderToDatabase(user.uid, newOrder).then((res) => {
      if (res.isSuccess) {
        sendMail(orderDataToMail);
        redDispatch({ type: 'success' });
        setTimeout(() => {
          dispatch(resetCartAction());
          redDispatch({ type: 'reset' });
          navigate('/orders');
        }, 1200);
      }
    });
  };
  return (
    <VStack spacing="5" paddingY={5}>
      <Heading as="h6" size="sm" color="#4146a3b5">
        Mi Carrito
      </Heading>
      <TableContainer whiteSpace="pre-wrap">
        <CartTable />
        <Divider size="lg" orientation="horizontal" colorScheme={'blue'} />
        {cart.length > 0 && (
          <ButtonGroup
            spacing={5}
            position={'relative'}
            float={'right'}
            mr="10px">
            <Button
              isDisabled={estado.isLoading || estado.isSuccessful}
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
              onClick={() => dispatch(resetCartAction())}
              mt={4}
              _hover={{ background: 'green.100' }}>
              Limpiar carrito
            </Button>
            <Button
              isDisabled={estado.isLoading || estado.isSuccessful}
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
              onClick={createOrderHandle}
              mt={4}
              _hover={{ background: 'green.100' }}>
              Enviar pedido
            </Button>
          </ButtonGroup>
        )}
      </TableContainer>
    </VStack>
  );
};

export default Cart;
