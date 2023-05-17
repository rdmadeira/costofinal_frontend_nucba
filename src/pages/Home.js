import React, { useState, useEffect } from 'react';
import { Box, VStack, Heading, Spinner } from '@chakra-ui/react';
import CustomCarousel from '../components/carousel/Carousel';
import { sendItemsToCarrousel } from '../utils/data_utils/dataUtils';
import itemsToCarrousel from '../data/itemsToCarrousel.json';

/* import homeUrl from '../assets/plumbing-home.jpg'; */

const Home = () => {
  const [itemsToCarousel, setitemsToCarousel] = useState([]);

  useEffect(() => {
    sendItemsToCarrousel(itemsToCarrousel).then((res) =>
      setitemsToCarousel(res)
    );
  }, [sendItemsToCarrousel, setitemsToCarousel]);

  return (
    <Box
      bgImage={`url(${process.env.PUBLIC_URL}/assets/plumbing-home.jpg)`}
      bgColor={'#f0fff4e0'}
      bgSize="cover"
      bgRepeat="no-repeat"
      w={{ base: '100vw', md: `calc(100vw - 13rem)` }}
      bgBlendMode={'lighten'}
      paddingY={5}
      minH="88vh">
      <VStack spacing={'8'}>
        <Heading alignSelf="center" color={'#424a9d'}>
          Costo Final
        </Heading>
        {itemsToCarousel.length > 0 ? (
          <CustomCarousel items={itemsToCarousel} focusOnSelect={true} />
        ) : (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </VStack>
    </Box>
  );
};

export default Home;
