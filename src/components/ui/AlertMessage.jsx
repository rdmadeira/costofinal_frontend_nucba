import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const AlertMessage = ({ children, ...props }) => {
  return (
    <Flex pos={'relative'} flexDir="column" {...props}>
      <Box
        bgImage={`url(${process.env.PUBLIC_URL}/assets/alert_bell.png)`}
        backgroundSize={'contain'}
        backgroundRepeat={'no-repeat'}
        pos="absolute"
        top="5px"
        left="0"
        w="100%"
        h="100%"
        opacity="0.5"
        borderRadius="50%"
        outline="3px rgba(190, 190, 190, 0.6) solid"
        overflow={'visible'}
      />
      {children}
    </Flex>
  );
};

export default AlertMessage;
