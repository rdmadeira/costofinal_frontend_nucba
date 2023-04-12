import {
  Heading,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import Input from '../components/forms/Input';

const Account = () => {
  const name = useRef();
  console.log(name);
  return (
    <VStack>
      <Heading size="sm" color="gray.500">
        Mis datos
      </Heading>
      <Wrap>
        <form>
          <WrapItem>
            <FormControl>
              <FormLabel color="gray.500">Name</FormLabel>
              <InputGroup>
                <Input
                  disabled
                  name="name"
                  ref={name}
                  placeholder={name.current.value}
                />
                <InputRightElement h="100%">
                  <Button
                    onClick={() =>
                      (name.current.disabled = !name.current.disabled)
                    }>
                    Edit
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>Error Text</FormErrorMessage>
            </FormControl>
          </WrapItem>
        </form>
      </Wrap>
    </VStack>
  );
};

export default Account;
