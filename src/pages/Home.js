import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading } from '@chakra-ui/react';
import CustomCarousel from '../components/carousel/Carousel';
import { sendItemsToCarrousel } from '../utils/data_utils/dataUtils';

/* import homeUrl from '../assets/plumbing-home.jpg'; */

const Home = () => {
  const [itemsToCarousel, setitemsToCarousel] = useState([]);

  useEffect(() => {
    sendItemsToCarrousel().then((res) => setitemsToCarousel(res));
  }, [sendItemsToCarrousel, setitemsToCarousel]);

  return (
    <VStack height="80vh" spacing={8}>
      <Box
        pos={'absolute'}
        bgImage={`url(${process.env.PUBLIC_URL}/assets/plumbing-home.jpg)`}
        bgColor={'#f0fff4e0'}
        bgSize="cover"
        bgRepeat="no-repeat"
        w={{ base: '100vw', md: `calc(100vw - 13rem)` }}
        h={'85vh'}
        bgBlendMode={'lighten'}></Box>
      <Heading zIndex={'overlay'} alignSelf="center" color={'#424a9d'}>
        Costo Final
      </Heading>
      <CustomCarousel items={itemsToCarousel} focusOnSelect={true} />
    </VStack>
  );
};

export default Home;
