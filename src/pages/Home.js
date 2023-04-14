import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
/* import homeUrl from '../assets/plumbing-home.jpg'; */

const Home = () => {
  return (
    <Flex>
      <Box
        pos={'absolute'}
        bgImage={`url(${process.env.PUBLIC_URL}/assets/plumbing-home.jpg)`}
        bgColor={'green.100'}
        bgSize="cover"
        bgRepeat="no-repeat"
        w={{ base: '100vw', md: `calc(100vw - 13rem)` }}
        h={'85vh'}
        bgBlendMode={'darken'}>
        {/* <Image src={homeUrl} /> */}
      </Box>
      {/* <Box
        w={'60%'}
        h={'60vh'}
        bgColor={'green.800'}
        pos={'absolute'}
        bgBlendMode={'difference'}
      /> */}
    </Flex>
  );
};

export default Home;
