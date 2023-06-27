import React, { useState } from 'react';
import {
  VStack,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  /* FormErrorMessage, */
  FormHelperText,
  Input,
  InputRightAddon,
  Button,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NotAuthorizedError from '../components/not_authorized_error/NotAuthorizedError';

const UpdatePrice = () => {
  const [updateNumber, setupdateNumber] = useState(null);
  const user = useSelector((store) => store.user);

  const onChangeHandle = (value) => {
    const num = Number(value);
    setupdateNumber(num.toFixed(2));
  };

  const sendUpdatePricesHandle = async () => {
    const response = await fetch(
      'https://localhost:5001/api/products/update-price',
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer' + ' ' + user.uid,
        },
        body: {
          incrementFactor: updateNumber,
        },
      }
    );
    const responseData = await response.json();
    alert(responseData.data.message || responseData.error.message);
    console.log(responseData);
  };

  return user && user.uid === process.env.REACT_APP_UID ? (
    <VStack>
      <Heading as="h6" size="sm" color="#4146a3b5">
        Update Prices
      </Heading>
      <Text>#### Estás en una página de perfil administrativo ####</Text>
      <form>
        <VStack>
          <h6>Ingrese el aumento en percentaje:</h6>
          <FormControl>
            <FormLabel>Aumento (%)</FormLabel>
            <InputGroup>
              <Input
                type="number"
                onChange={(e) => onChangeHandle(e.target.value)}
                /* onBlur={(e) => setupdateNumber(e.target.value)} */
              />
              <InputRightAddon> % </InputRightAddon>
            </InputGroup>
            <FormHelperText>Ingrese solamente números</FormHelperText>
          </FormControl>
          <Button type="button" onClick={sendUpdatePricesHandle}>
            Actualizar Precios
          </Button>
        </VStack>
      </form>
    </VStack>
  ) : (
    <NotAuthorizedError />
  );
};

export default UpdatePrice;
