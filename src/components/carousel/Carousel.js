import React from 'react';
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

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
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
  return (
    <Carousel
      infinite
      focusOnSelect={true}
      draggable={false}
      autoPlay={true}
      transitionDuration={500}
      responsive={responsive}
      containerClass="carousel-container"
      itemClass="carousel-item"
      pauseOnHover>
      {items &&
        items.map((item) => {
          return (
            <Box key={item.id} h="100%">
              <Card
                h={'100%'}
                size={{ base: 'md', md: 'sm' }}
                align={'center'}
                justify="center">
                <CardHeader /* h={'33%'} */ textAlign="center">
                  <VStack alignContent={'center'}>
                    <Image src={item.image} h={{ base: '9rem', md: '4rem' }} />
                    <Text fontSize={{ base: 'lg', md: 'sm' }}>
                      {item.familia}
                    </Text>
                  </VStack>
                </CardHeader>
                <CardBody display={'flex'} alignItems="flex-end">
                  <VStack spacing={{ base: 6, md: 3 }}>
                    <Box>
                      <Text fontSize={{ base: 'lg', md: 'sm' }}>
                        {item['MEDIDA']}
                      </Text>
                    </Box>
                    <Box bg={'#424a9d'} p="2" borderRadius={'md'}>
                      <Text fontSize={{ base: 'lg', md: 'sm' }} color="white">
                        {formatPrices(item['PRECIO'])} /un
                      </Text>
                    </Box>
                  </VStack>
                </CardBody>
                <Divider color={'gray.300'} />
                <CardFooter>
                  <Button colorScheme={'green'} size={{ base: 'lg', md: 'sm' }}>
                    Compre Ahora
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
