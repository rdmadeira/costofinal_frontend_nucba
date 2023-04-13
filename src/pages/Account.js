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
import { inputsArray } from '../utils/inputsArray';
import { useForm, Controller } from 'react-hook-form';

const Account = () => {
  const user = useSelector((store) => store.user);
  const inputsArrayToRender = inputsArray.filter(
    (item) => item !== 'contraseña' && item !== 'confirme la contraseña'
  );

  const { handleSubmit, register, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombre: user.nombre,
      apellido: user.apellido,
      telefono: user.phone,
      email: user.email,
      numero: user.dirección.numero,
      calle: user.dirección.calle,
      localidad: user.dirección.localidad,
      CP: user.dirección.CP,
    },
  });

  const onSubmitHandle = (data) => {
    console.log(data);
  };

  return (
    <VStack w={'100%'} alignItems="center" spacing={'6'}>
      <Heading size="sm" color="gray.500">
        Mis datos
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmitHandle)}
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Wrap
          direction="row"
          flexWrap="wrap"
          justify={'center'}
          width={'80%'}
          spacing={[5, 3]}>
          {inputsArrayToRender.map((inputKey) => {
            return (
              <WrapItem
                key={user.uid + inputKey}
                width={
                  inputKey === 'numero' || inputKey === 'CP'
                    ? 'max(min(20%,250px),130px)'
                    : inputKey === 'localidad' || inputKey === 'telefono'
                    ? 'max(min(calc(80% - 10px - 20%),250px),200px)'
                    : 'max(min(80%,440px),350px)'
                }>
                <FormControl>
                  <FormLabel color="gray.500">
                    {inputKey[0].toUpperCase() + inputKey.slice(1)}
                  </FormLabel>
                  <InputGroup>
                    <Controller
                      name={inputKey}
                      rules={{
                        required: {
                          value: true,
                          message: 'Campo obligatório!',
                        },
                      }}
                      control={control}
                      render={({
                        field: {
                          onChange,
                          onBlur,
                          value = user[inputKey] ||
                            user['dirección'][inputKey] ||
                            user['phone'],
                          name = inputKey,
                          ref,
                        },
                      }) => (
                        <>
                          <Input
                            {...register(inputKey)}
                            ref={ref}
                            name={name}
                            id={name}
                            type={
                              inputKey === 'contraseña' ||
                              inputKey === 'confirme la contraseña'
                                ? 'password'
                                : inputKey === 'teléfono'
                                ? 'tel'
                                : 'text'
                            }
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder={
                              user[inputKey] || user['dirección'][inputKey]
                            }
                            disabled
                            _focusVisible={{
                              borderColor: 'transparent',
                              outline: '1px solid gray',
                            }}
                          />
                          <InputRightElement h="100%">
                            <Button
                              p="1"
                              bg={'green.100'}
                              borderLeftRadius={'none'}
                              onClick={() => {
                                document
                                  .getElementsByName(inputKey)[0]
                                  .toggleAttribute('disabled');
                              }}>
                              <FiEdit width="100%" color="gray" />
                            </Button>
                          </InputRightElement>
                        </>
                      )}
                    />
                  </InputGroup>
                  <FormErrorMessage>Error Text</FormErrorMessage>
                </FormControl>
              </WrapItem>
            );
          })}

          <WrapItem alignSelf={'center'} justifyContent={'flex-end'} w={'100%'}>
            <Button type="submit" colorScheme="green" mt={'5'}>
              Grabar cambios
            </Button>
          </WrapItem>
        </Wrap>
      </form>
    </VStack>
  );
};

export default Account;
