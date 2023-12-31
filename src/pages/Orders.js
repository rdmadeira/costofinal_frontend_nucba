import React, { useEffect, useContext /* , useState */ } from 'react';

import { OpenLoginContext } from '../components/sidebar_with_header/Sidebar_Header';
import { Spinner } from '@chakra-ui/react';
/* import { getOrders } from '../firebase/firestore';
import { getOrdersAction } from '../redux/orders/ordersActions'; */

import useGetOrders from '../hooks/useGetOrders';
/* import ServerError from '../components/serv_error/ServerError'; */

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
  const onOpenLogin = useContext(OpenLoginContext);
  const {
    data: orders,
    isError: isOrdersError,
    error: ordersError,
    isFetching,
    isRefetching,
  } = useGetOrders();

  useEffect(() => {
    if (isOrdersError) {
      if (ordersError?.response?.status === 401) {
        onOpenLogin();
      }
    }
  }, [isOrdersError, ordersError]);

  return (
    <VStack spacing={5} py={'5'} px={'3'}>
      <Heading as="h6" size="sm" color="#4146a3b5">
        Mis Pedidos
      </Heading>

      {isFetching || isRefetching ? (
        <VStack mt={'10'}>
          <Text color={'blue'}>
            {isOrdersError
              ? 'Sessión vencida... Aguarde un momento...'
              : 'Aguarde un momento...'}
          </Text>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </VStack>
      ) : (
        <>
          {orders?.data?.data?.length < 1 && (
            <Text>Todavía no tenés pedidos.</Text>
          )}
          <SimpleGrid spacing={'4'} placeItems="center">
            {orders?.data?.data?.map((order) => {
              return (
                <Card key={order._id} w="80%">
                  <CardHeader>
                    <HStack spacing={'4'}>
                      <Box>
                        {order.status.status === 'pending' ? (
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
                        ) : order.status.status === 'process' ? (
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
                      <Text>{'Pedido n° ' + order._id.slice(0, 7)}</Text>
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
                              <Tr key={item.product.CODIGO + order._id}>
                                <Td>{item.product.MEDIDA}</Td>
                                <Td>{item.product.CODIGO}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{formatPrices(item.product.PRECIO)}</Td>
                                <Td>
                                  {formatPrices(
                                    item.product.PRECIO * item.quantity
                                  )}
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
                                    acc +
                                    current.quantity * current.product.PRECIO,
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
            })}
          </SimpleGrid>
        </>
      )}
    </VStack>
  );
};

export default Orders;
