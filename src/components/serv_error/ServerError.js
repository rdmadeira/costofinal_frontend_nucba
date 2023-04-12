import React from 'react';
import { Button, Center, Heading, VStack, Text } from '@chakra-ui/react';
import { MdRunningWithErrors } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ServerError = ({ message }) => {
  const navigate = useNavigate();
  const reload = () => {
    navigate(0);
  };
  return (
    <Center w="100%" h="70vh" color="gray.500">
      <VStack spacing="3">
        <MdRunningWithErrors color="red" size="40px" />

        <Heading size={'sm'}>Hubo un error inesperado</Heading>
        <Center>
          <Text>El servidor respondió con eu código {message}</Text>
        </Center>
        <BsClockHistory />
        <Center>
          <Text>Recargá la página o intente más tarde</Text>
        </Center>
        <Center>
          <Button onClick={reload} variant="outline" colorScheme="green">
            Recargar
          </Button>
        </Center>
      </VStack>
    </Center>
  );
};

export default ServerError;
