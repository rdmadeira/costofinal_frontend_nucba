import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../firebase/firestore';
import { getOrdersAction } from '../redux/orders/ordersActions';

import {
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tooltip,
  Box,
  Tfoot,
} from '@chakra-ui/react';
import { formatPrices } from '../utils/product_utils/product_utils';
import {
  BsBagCheckFill,
  BsFillBagDashFill,
  BsFillBagFill,
} from 'react-icons/bs';

const Orders = () => {
  const user = useSelector((store) => store.user);
  const orders = useSelector((store) => store.orders);
  const [getOrdersState, setgetOrdersState] = useState({
    isError: null,
    message: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders(user.uid).then((res) => {
      setgetOrdersState({ isError: res.isError, message: res.message });

      dispatch(getOrdersAction(res.items));
    });
  }, [dispatch, getOrders, getOrdersAction]);

  return (
    <VStack>
      <Heading as="h6" size="sm" color="gray.500">
        Mis Pedidos
      </Heading>
      {orders.length < 1 && <Text>Todavía no tenés pedidos.</Text>}
      <SimpleGrid spacing={'4'}>
        {getOrdersState.isError ? (
          <div>Hubo un error en el servidor!!</div> // Crear una página de Error de servidor!!
        ) : (
          orders.map((order) => {
            return (
              <Card key={order.id}>
                <CardHeader>
                  <HStack spacing={'4'}>
                    <Box>
                      {order.status === 'pending' ? (
                        <Tooltip
                          placement="top-start"
                          hasArrow
                          fontSize="lg"
                          label="Pendiente..."
                          p={('2', '4')}
                          bg="red.400">
                          <span>
                            <BsFillBagDashFill
                              color="red"
                              type="dash"
                              name="dash"
                            />
                          </span>
                        </Tooltip>
                      ) : order.status === 'proccess' ? (
                        <Tooltip
                          placement="top-start"
                          hasArrow
                          fontSize="lg"
                          label="En proceso..."
                          p={('2', '4')}
                          bg="#c3c305">
                          <span>
                            <BsFillBagFill
                              color="#9a9a00"
                              type="fill"
                              name="fill"
                            />
                          </span>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top-start"
                          hasArrow
                          fontSize="lg"
                          label="Finalizado con suceso!"
                          p={('2', '4')}
                          bg="green.400">
                          <span>
                            <BsBagCheckFill
                              color="green"
                              type="check"
                              name="check"
                            />
                          </span>
                        </Tooltip>
                      )}
                    </Box>
                    <Text>{'Pedido n° ' + order.id.slice(0, 7)}</Text>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <TableContainer>
                    <Table size="sm" whiteSpace="pre-wrap">
                      <Thead>
                        <Tr>
                          <Th>PRODUCTO</Th>
                          <Th>CODIGO</Th>
                          <Th>CANT.</Th>
                          <Th>PRECIO UN.</Th>
                          <Th>SUB-TOTAL</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {order.items.map((item) => {
                          return (
                            <Tr key={item.CODIGO + order.id}>
                              <Td>{item.MEDIDA}</Td>
                              <Td>{item.CODIGO}</Td>
                              <Td>{item.quantity}</Td>
                              <Td>{formatPrices(item.PRECIO)}</Td>
                              <Td>
                                {formatPrices(item.PRECIO * item.quantity)}
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th></Th>
                          <Th></Th>
                          <Th></Th>
                          <Th>Total del pedido:</Th>
                          <Th>
                            {formatPrices(
                              order.items.reduce(
                                (acc, current) =>
                                  acc + current.quantity * current.PRECIO,
                                0
                              )
                            )}
                          </Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </CardBody>
                <CardFooter>{'Grabado el ' + order.createdAt}</CardFooter>
              </Card>
            );
          })
        )}
      </SimpleGrid>
    </VStack>
  );
};

export default Orders;
