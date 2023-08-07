import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tr, Td, IconButton, Text } from '@chakra-ui/react';
import { addItemToCartAction } from '../../redux/cart/cartActions';
import { formatPrices } from '../../utils/product_utils/product_utils';
import { addItemToCart } from '../../utils/cart_utils/cartUtils';
import { BiCartDownload } from 'react-icons/bi';
import { OpenLoginContext } from '../sidebar_with_header/Sidebar_Header';
import useGetUser from '../../hooks/useGetUser';

const ProductLine = ({ subProd }) => {
  const KIT = subProd.KIT;

  const [cantidad, setcantidad] = useState(KIT);
  const cart = useSelector((store) => store.cart);
  /* const user = useSelector((store) => store.user); */
  const { data: user } = useGetUser();
  const dispatch = useDispatch();
  const onOpen = useContext(OpenLoginContext);

  const addItemToCartHandle = (subProd, qty) => {
    if (user?.data?.data) {
      const item = { ...subProd, quantity: qty };
      const updatedCart = addItemToCart(item, cart); // ver pq no actua el nuevo item. Ver el tema cart de redux
      dispatch(addItemToCartAction(updatedCart));
    } else {
      onOpen();
    }
  };

  return (
    <Tr>
      <Td width="10%">{subProd['CODIGO']}</Td>
      <Td width="45%">{subProd['MEDIDA']}</Td>
      <Td width="15%">{formatPrices(subProd['PRECIO'])}</Td>
      <Td width="20%" whiteSpace={'nowrap'}>
        <Button
          isDisabled={cantidad > KIT ? false : true}
          size={{ base: 'lg', md: 'sm' }}
          onClick={() => setcantidad(cantidad - KIT)}>
          -
        </Button>
        <Text as={'span'} fontSize={{ base: 'md', md: 'sm' }} m="3">
          {cantidad}
        </Text>
        <Button
          onClick={() => setcantidad(cantidad + KIT)}
          size={{ base: 'lg', md: 'sm' }}>
          +
        </Button>
      </Td>
      <Td width="10%">
        <IconButton
          icon={<BiCartDownload />}
          onClick={() => addItemToCartHandle(subProd, cantidad)}
        />
      </Td>
    </Tr>
  );
};

export default ProductLine;
