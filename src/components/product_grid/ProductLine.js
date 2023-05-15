import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tr, Td, IconButton, Text } from '@chakra-ui/react';
import { addItemToCartAction } from '../../redux/cart/cartActions';
import { formatPrices } from '../../utils/product_utils/product_utils';
import { addItemToCart } from '../../utils/cart_utils/cartUtils';
import { BiCartDownload } from 'react-icons/bi';
import { OpenLoginContext } from '../sidebar_with_header/Sidebar_Header';

const ProductLine = ({ subProd }) => {
  console.log(subProd);

  const KIT = subProd.KIT;

  const [cantidad, setcantidad] = useState(KIT);
  const cart = useSelector((store) => store.cart);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const onOpen = useContext(OpenLoginContext);

  const addItemToCartHandle = (subProd, qty) => {
    if (user) {
      const item = { ...subProd, quantity: qty };
      const updatedCart = addItemToCart(item, cart);
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
          isDisabled={
            KIT === 10 && cantidad > 10
              ? false
              : KIT === 10 && cantidad <= 10
              ? true
              : KIT === 20 && cantidad > 20
              ? false
              : true
          }
          size={{ base: 'lg', md: 'sm' }}
          onClick={() =>
            setcantidad(KIT === 10 ? cantidad - 10 : cantidad - 20)
          }>
          -
        </Button>
        <Text as={'span'} fontSize={{ base: 'md', md: 'sm' }} m="3">
          {cantidad}
        </Text>
        <Button
          onClick={() =>
            setcantidad(KIT === 10 ? cantidad + 10 : cantidad + 20)
          }
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
