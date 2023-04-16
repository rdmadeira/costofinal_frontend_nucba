import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tr, Td, Text, Button } from '@chakra-ui/react';
import { updateCartAction } from '../../redux/cart/cartActions';
import { AiFillDelete } from 'react-icons/ai';

const CartLine = ({ cartItem, formatPrices }) => {
  const [cantidad, setcantidad] = useState(cartItem.quantity);
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);

  useEffect(() => {
    const updatedCart = cart.map((item) => {
      if (item.id === cartItem.id) return { ...item, quantity: cantidad };
      return item;
    });
    dispatch(updateCartAction(updatedCart));
  }, [cantidad]);

  const deleteItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    dispatch(updateCartAction(updatedCart));
  };

  return (
    <Tr>
      <Td textAlign="center">{cartItem.CODIGO}</Td>
      <Td textAlign="center">{cartItem.MEDIDA}</Td>
      <Td textAlign="center">{formatPrices(cartItem.PRECIO)}</Td>
      <Td textAlign="center" whiteSpace={'nowrap'}>
        <Button
          isDisabled={cantidad >= 2 ? false : true}
          size={{ base: 'lg', md: 'sm' }}
          onClick={() => setcantidad((c) => c - 1)}
          variant="outline">
          -
        </Button>
        <Text as={'span'} fontSize={{ base: 'md', md: 'sm' }} m="3">
          {cantidad}
        </Text>
        <Button
          onClick={() => setcantidad(cantidad + 1)}
          size={{ base: 'lg', md: 'sm' }}
          variant="outline">
          +
        </Button>
      </Td>
      <Td textAlign="center">
        {formatPrices(cartItem.PRECIO * cartItem.quantity)}
      </Td>
      <Td>
        <Button variant="outline" onClick={() => deleteItem(cartItem)}>
          <AiFillDelete color="red" />
        </Button>
      </Td>
    </Tr>
  );
};

export default CartLine;
