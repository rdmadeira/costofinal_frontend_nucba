import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Box,
  VStack,
  Button,
  Text,
  Image,
  Divider,
} from '@chakra-ui/react';
import { formatPrices } from '../../utils/product_utils/product_utils';
import { useContext } from 'react';
import { OpenLoginContext } from '../sidebar_with_header/Sidebar_Header';
import { addItemToCart } from '../../utils/cart_utils/cartUtils';
import { addItemToCartAction } from '../../redux/cart/cartActions';
import AlertMessage from '../ui/AlertMessage.jsx';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 921 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 920, min: 520 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomCarousel = ({ items }) => {
  const onOpenLogin = useContext(OpenLoginContext);
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const addToCartHandle = (item) => {
    if (user) {
      item = { ...item, quantity: item.TIPO === 'Rejillas' ? 10 : 20 };
      const updatedCart = addItemToCart(item, cart);
      dispatch(addItemToCartAction(updatedCart));

      return;
    }
    onOpenLogin();
    return;
  };

  return (
    <Carousel
      infinite
      draggable={false}
      autoPlay={true}
      transitionDuration={500}
      responsive={responsive}
      containerClass="carousel-container"
      itemClass="carousel-item"
      pauseOnHover={true}>
      {items &&
        items.map((item) => {
          return (
            <Box key={item.id} h="100%">
              <Card
                h={'100%'}
                size={{ base: 'md', sm: 'sm' }}
                align={'center'}
                justify="center">
                <CardHeader /* h={'33%'} */ textAlign="center">
                  <VStack alignContent={'center'}>
                    <Image
                      src={process.env.PUBLIC_URL + item.image}
                      h={{ base: '9rem', sm: '4rem' }}
                    />
                    <Text fontSize={{ base: 'lg', sm: 'sm' }}>
                      {item.familia}
                    </Text>
                  </VStack>
                  <AlertMessage
                    w="60px"
                    h="60px"
                    fontSize="2xs"
                    pos="absolute"
                    right="5px"
                    top="0px">
                    <Text zIndex={'50'} pos="relative" fontWeight={'bold'}>
                      Pedido Mínimo:
                      <Text as="span" fontSize={'md'} display="block">
                        {item.TIPO === 'Rejillas' ? '10' : '20'}
                      </Text>
                      unidades
                    </Text>
                  </AlertMessage>
                </CardHeader>
                <CardBody display={'flex'} alignItems="flex-end">
                  <VStack spacing={{ base: 6, sm: 3 }}>
                    <Box>
                      <Text fontSize={{ base: 'lg', sm: 'sm' }}>
                        {item['MEDIDA']}
                      </Text>
                    </Box>
                    <Box bg={'#424a9d'} p="2" borderRadius={'md'}>
                      <Text fontSize={{ base: 'lg', sm: 'sm' }} color="white">
                        {formatPrices(item['PRECIO'])} /un
                      </Text>
                    </Box>
                  </VStack>
                </CardBody>
                <Divider color={'gray.300'} />
                <CardFooter>
                  <Button
                    colorScheme={'green'}
                    size={{ base: 'md', md: 'sm' }}
                    onClick={() => addToCartHandle(item)}>
                    Compre Ahora {item.TIPO === 'Rejillas' ? '10' : '20'} un.
                  </Button>
                </CardFooter>
              </Card>
            </Box>
          );
        })}
    </Carousel>
  );
};

export default CustomCarousel;
