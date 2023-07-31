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
  useToast,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/forms/Input';
import { inputsArray } from '../utils/inputsArray';
import { upDateDataToDB } from '../firebase/auth';
import { setUser } from '../redux/user/userActions';
import useGetUser from '../hooks/useGetUser';

const Account = () => {
  const { data: user } = useGetUser({ complete: true });
  const inputsArrayToRender = inputsArray.filter(
    (item) => item !== 'contraseña' && item !== 'confirme la contraseña'
  );

  const useRefs = useRef(inputsArrayToRender.map(() => React.createRef()));

  const dispatch = useDispatch();
  const toast = useToast();

  const { handleSubmit, register, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      nombre: user?.data?.data?.nombre,
      apellido: user?.data?.data?.apellido,
      telefono: user?.data?.data?.phone,
      email: user?.data?.data?.email,
      numero: user?.data?.data?.direccion?.numero,
      calle: user?.data?.data?.direccion?.calle,
      localidad: user?.data?.data?.direccion?.localidad,
      CP: user?.data?.data?.direccion?.CP,
      complemento: user?.data?.data?.direccion?.complemento,
    },
  });

  const onSubmitHandle = (data) => {
    console.log('data', data);

    const updatedData = {
      ...user,
      nombre: data.nombre,
      apellido: data.apellido,
      phone: data.telefono,
      direccion: {
        localidad: data.localidad,
        complemento: data.complemento,
        calle: data.calle,
        numero: data.numero,
        CP: data.CP,
      },
    };

    upDateDataToDB(updatedData).then((res) => {
      if (res.isSuccesful) {
        toast({
          title: user.nombre,
          description: 'Cambios guardados con suceso!',
          status: 'success',
          isClosable: true,
        });
        dispatch(setUser(updatedData));
        return;
      }
    });
  };

  return (
    <VStack w={'100%'} alignItems="center" spacing={'6'} py={'5'}>
      <Heading size="sm" color="gray.500">
        Mis datos
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmitHandle, (error) => console.log(error))}
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Wrap
          direction="row"
          flexWrap="wrap"
          justify={'center'}
          width={'80%'}
          spacing={[5, 3]}>
          {inputsArrayToRender.map((inputKey, index) => {
            return (
              <WrapItem
                key={user?.data?.data._id + inputKey}
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
                          value = user?.data?.data[inputKey] // Notación de corchetes no acepta ?. notación, por eso tuve que hacer eso
                            ? user?.data?.data[inputKey]
                            : user?.data?.data['direccion']
                            ? user?.data?.data['direccion'][inputKey]
                            : '',
                        },
                      }) => (
                        <>
                          <Input
                            {...register(inputKey)}
                            ref={useRefs.current && useRefs.current[index]} // El ref da error se pongo antes del register
                            id={inputKey}
                            type={
                              inputKey === 'contraseña' ||
                              inputKey === 'confirme la contraseña'
                                ? 'password'
                                : inputKey === 'teléfono'
                                ? 'tel'
                                : 'text'
                            }
                            onChange={onChange} // OnChange y onBlur de register. Tiene que estar después del register.
                            onBlur={() => {
                              // Custom onBlur
                              useRefs.current[index] &&
                                useRefs.current[index].current.toggleAttribute(
                                  'disabled'
                                );
                            }}
                            value={value}
                            placeholder={
                              user?.data?.data?.inputKey ||
                              user?.data?.data?.direccion?.inputKey
                            }
                            disabled
                            _focusVisible={{
                              borderColor: 'transparent',
                              outline: '1px solid gray',
                            }}
                          />
                          {inputKey !== 'email' && (
                            <InputRightElement h="100%">
                              <Button
                                p="1"
                                bg={'green.100'}
                                borderLeftRadius={'none'}
                                onClick={() => {
                                  const myInput =
                                    useRefs.current[index] &&
                                    useRefs.current[index].current;
                                  myInput.toggleAttribute('disabled');
                                  myInput.focus();
                                }}>
                                <FiEdit width="100%" color="gray" />
                              </Button>
                            </InputRightElement>
                          )}
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
              Guardar cambios
            </Button>
          </WrapItem>
        </Wrap>
      </form>
    </VStack>
  );
};

export default Account;
