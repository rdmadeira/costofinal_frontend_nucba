import React from 'react';
import { Button, Center, Heading, VStack, Text } from '@chakra-ui/react';
import { MdRunningWithErrors } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const NotAuthorizedError = ({ message }) => {
  const navigate = useNavigate();
  const reload = () => {
    navigate(0);
  };
  return (
    <Center w="100%" h="70vh" color="gray.500">
      <VStack spacing="3">
        <MdRunningWithErrors color="red" size="40px" />

        <Heading size={'sm'}>Acceso Denegado</Heading>
        <Center>
          <Text size={'lg'}>Codigo: 401 - </Text>

          <Text>No hay suficiente permisos: {message}</Text>
        </Center>
        <BsClockHistory />
        <Center>
          <Text>Entre con la authenticación permitida por la página.</Text>
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

export default NotAuthorizedError;
