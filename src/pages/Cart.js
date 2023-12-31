import React from 'react';
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

import { resetCartAction } from '../redux/cart/cartActions';
import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CartTable from '../components/cart/CartTable';
import useGetUser from '../hooks/useGetUser';
import usePostOrder from '../hooks/usePostOrder';

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const { data: user } = useGetUser({ complete: true });
  const { mutate, isLoading, isError, isSuccess } = usePostOrder();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createOrderHandle = () => {
    const newOrder = createOrder(user?.data?.data._id, cart);
    console.log(newOrder);
    /* const orderDataToMail = {
      ...newOrder,
      email: user?.data?.data.email,
      nombre: user?.data?.data.nombre,
      apellido: user?.data?.data.apellido,
      telefono: user?.data?.data.telefono,
      direccion: user?.data?.data.direccion,
    }; */

    /* console.log('orderDataToMail', orderDataToMail); */

    mutate(newOrder, {
      onSuccess: (data) => {
        console.log('data', data.data.data);

        sendMail({ ...data.data.data })
          .then(() =>
            alert(
              `Pedido n° ${data.data.data._id} creado con suceso! Recibirás un email con detalles del pedido`
            )
          )
          .catch(() => alert('Ocurrió un error inesperado'));

        setTimeout(() => {
          dispatch(resetCartAction());

          navigate('/orders');
        }, 1200);
      },
    });

    /* redDispatch({ type: 'loading' }); */
    /* createOrderToDatabase(user.uid, newOrder)
      .then((res) => {
        if (res.isSuccess) {
          sendMail(orderDataToMail)
            .then(() =>
              alert(
                'Pedido creado con suceso! Recibirás un email con detalles del pedido'
              )
            )
            .catch(() => alert('Ocurrió un error inesperado'));
          redDispatch({ type: 'success' });
          setTimeout(() => {
            dispatch(resetCartAction());
            redDispatch({ type: 'reset' });
            navigate('/orders');
          }, 1200);
        }
      })
      .catch((err) => {
        alert('Ocurrió un error inesperado. Pruebe más tarde');
        throw new Error(err);
      }); */
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
              isDisabled={isLoading || isSuccess}
              rightIcon={
                isLoading ? (
                  <Spinner />
                ) : isSuccess ? (
                  <CheckIcon />
                ) : isError ? (
                  <WarningTwoIcon />
                ) : null
              }
              variant={isSuccess ? 'solid' : 'outline'}
              colorScheme={isError ? 'red' : 'green'}
              float="right"
              onClick={() => dispatch(resetCartAction())}
              mt={4}
              _hover={{ background: 'green.100' }}>
              Limpiar carrito
            </Button>
            <Button
              isDisabled={isLoading || isSuccess}
              rightIcon={
                isLoading ? (
                  <Spinner />
                ) : isSuccess ? (
                  <CheckIcon />
                ) : isError ? (
                  <WarningTwoIcon />
                ) : null
              }
              variant={isSuccess ? 'solid' : 'outline'}
              colorScheme={isError ? 'red' : 'green'}
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
