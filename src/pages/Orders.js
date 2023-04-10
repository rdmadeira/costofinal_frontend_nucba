import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../firebase/firestore';
import { getOrdersAction } from '../redux/orders/ordersActions';
import {
  VStack,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  Box,
} from '@chakra-ui/react';
import { formatPrices } from '../utils/product_utils/product_utils';

const Orders = () => {
  const user = useSelector((store) => store.user);
  const orders = useSelector((store) => store.orders);

  const dispatch = useDispatch();
  useEffect(() => {
    getOrders(user.uid).then((res) => {
      dispatch(getOrdersAction(res));
    });
  }, [dispatch, getOrders, getOrdersAction]);
  return (
    <VStack>
      <Heading as="h6" size="sm">
        Pedidos
      </Heading>
      <SimpleGrid spacing={'4'}>
        {orders.map((order) => {
          return (
            <Card key={order.id}>
              <CardHeader>{'Pedido n° ' + order.id}</CardHeader>
              <CardBody>
                {order.items.map((item) => {
                  return (
                    <HStack key={item.CODIGO + order.id}>
                      <Box>{item.MEDIDA}</Box>
                      <Box>{item.quantity}</Box>
                      <Box>{formatPrices(item.PRECIO)}</Box>
                      <Box>{formatPrices(item.PRECIO * item.quantity)}</Box>
                    </HStack>
                  );
                })}
              </CardBody>
              <CardFooter>{'Pedido el ' + order.createdAt}</CardFooter>
            </Card>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default Orders;
