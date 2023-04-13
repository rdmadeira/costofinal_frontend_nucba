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
import React from 'react';
import { useSelector } from 'react-redux';
import Input from '../components/forms/Input';
import { FiEdit } from 'react-icons/fi';

const Account = () => {
  const user = useSelector((store) => store.user);
  let inputsKeys = Object.keys(user)
    .concat(Object.keys(user['address']))
    .filter(
      (key) =>
        key !== 'uid' &&
        key !== 'displayName' &&
        key !== 'createdAt' &&
        key !== 'address'
    );

  const isDisabledInputHandle = () => {};

  return (
    <VStack>
      <Heading size="sm" color="gray.500">
        Mis datos
      </Heading>
      <Wrap>
        <form>
          {inputsKeys.map((inputKey) => {
            return (
              <WrapItem key={user.uid + inputKey}>
                <FormControl isDisabled={isDisabledInputHandle}>
                  <FormLabel color="gray.500">{inputKey}</FormLabel>
                  <InputGroup>
                    <Input
                      disabled
                      name={inputKey}
                      id={inputKey}
                      placeholder={user[inputKey]}
                      value={user[inputKey] || user['address'][inputKey]}
                    />
                    <InputRightElement h="100%">
                      <Button
                        p="1"
                        onClick={() => {
                          document
                            .getElementsByName(inputKey)[0]
                            .toggleAttribute('disabled');
                        }}>
                        <FiEdit width="100%" color="gray" />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>Error Text</FormErrorMessage>
                </FormControl>
              </WrapItem>
            );
          })}
        </form>
      </Wrap>
    </VStack>
  );
};

export default Account;
