import React, { useState /* , useEffect */ } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Spinner,
  DrawerFooter,
  Button,
  Text,
  VStack,
  Box,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import Input from './Input';
import { BsCheck } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

import useAuth from '../../hooks/useAuth';
import {
  /* createUser,
  loginUserHandle, */
  resetPassword,
} from '../../firebase/auth';
import { inputsArray } from '../../utils/inputsArray';

const SignUpForm = ({ loginState: { isLogin, setisLogin } }) => {
  const { register, handleSubmit, control, formState, getValues, setError } =
    useForm({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
    });

  const [isSuccessRequest, setisSuccessRequest] = useState(null);
  const toast = useToast();
  const newUser = useAuth(isLogin);

  /*  useEffect(() => {
    console.log(formState.isSubmitting, formState.isSubmitSuccessful);
  }, [formState]); */

  const onSubmit = (data) => {
    console.log('data en SignUpForm', data);

    if (!isLogin) {
      newUser.mutate(
        { ...data, contrasena: data.contraseña },
        {
          onSuccess: (resp) => {
            localStorage.setItem('authCF', resp.data.data.token);
            toast({
              title: 'Cliente ',
              description: 'Creado con sucesso',
              status: 'success',
              isClosable: true,
            });
          },
          onError: (error) => {
            console.log('error', error);
            toast({
              title: 'Falla al crear Usuario:',
              description:
                'Error - ' +
                error.response?.data?.errors[0].message +
                ' ' +
                error.response?.data?.errors[0].field +
                ' ',
              status: 'error',
              isClosable: true,
            });
          },
        }
      );

      /* return createUser(data).then((res) => {
        if (res.isSuccesful) {
          setisSuccessRequest(true);
          toast({
            title: 'Cliente ' + res.message,
            description: 'Creado con sucesso',
            status: 'success',
            isClosable: true,
          });
          setTimeout(() => onClose(), 1000);
        } else {
          setisSuccessRequest(false);
          toast({
            title: 'Error:',
            description: res.message,
            status: 'error',
            isClosable: true,
          });
        }
      }); */
    }

    /* return loginUserHandle(data).then((res) => {
      if (res.isSuccesful) {
        setisSuccessRequest(true);
        toast({
          title: 'Login:',
          description: res.message,
          status: 'success',
          isClosable: true,
        });
        setTimeout(() => onClose(), 1000);
      } else {
        setisSuccessRequest(false);
        toast({
          title: 'Login:',
          description: res.message,
          status: 'error',
          isClosable: true,
        });
      }
    }); */
  };

  const inputNames = isLogin ? ['email', 'contraseña'] : inputsArray;

  const resetPasswordHandle = () => {
    const email = getValues().email;
    if (!email) {
      setError('email', { type: 'required' });
      alert('Por favor, escriba su email!');
    } else {
      resetPassword(email);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack
          spacing={'4'}
          display="flex"
          flexDirection="row"
          wrap="wrap"
          columnGap="10px">
          {inputNames.map((name) => {
            return (
              <FormControl
                isInvalid={formState.errors[name]}
                width={
                  name === 'numero' || name === 'CP'
                    ? '20%'
                    : name === 'localidad' || name === 'telefono'
                    ? 'calc(100% - 10px - 20%)'
                    : '100%'
                }
                isRequired
                key={name}
                display="inline-block">
                <FormLabel htmlFor={name}>
                  {name[0].toLocaleUpperCase() + name.slice(1)}
                </FormLabel>
                <Controller
                  name={name}
                  rules={
                    name === 'confirme la contraseña'
                      ? {
                          required: {
                            value: true,
                            message: 'Campo obligatório!',
                          },
                          validate: (value) => {
                            if (value === getValues('contraseña')) return true;
                            return 'Confirmación de contraseña no coincide';
                          },
                        }
                      : {
                          required: {
                            value: true,
                            message: 'Campo obligatório!',
                          },
                        }
                  }
                  control={control}
                  render={({
                    field: { onChange, onBlur, value = '', name, ref },
                  }) => (
                    <Input
                      {...register(name)}
                      ref={ref}
                      name={name}
                      id={name}
                      type={
                        name === 'contraseña' ||
                        name === 'confirme la contraseña'
                          ? 'password'
                          : name === 'teléfono'
                          ? 'tel'
                          : 'text'
                      }
                      onChange={(value) => {
                        setisSuccessRequest(null);
                        onChange(value);
                      }}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />

                <FormErrorMessage>
                  {formState.errors[name] && formState.errors[name].message}
                </FormErrorMessage>
              </FormControl>
            );
          })}
          <Text>
            {isLogin ? 'No tenés cuenta? ' : 'Ya estás registrado? '}

            <button
              type="button"
              onClick={() => setisLogin(!isLogin)}
              style={{ fontWeight: 'bold', color: 'blue' }}>
              {isLogin ? 'Registrese' : 'Ingrese Aqui'}
            </button>
          </Text>
          <Text>
            Olvidaste tu contraseña?{' '}
            <button
              type="button"
              onClick={resetPasswordHandle}
              style={{ fontWeight: 'bold', color: 'blue' }}>
              Restablecer
            </button>
          </Text>
        </VStack>
        <DrawerFooter>
          <Button
            type="submit"
            colorScheme={
              isSuccessRequest
                ? 'green'
                : isSuccessRequest === false
                ? 'red'
                : 'gray'
            }
            rightIcon={
              formState.isSubmitting ? (
                <Spinner />
              ) : formState.isSubmitSuccessful && isSuccessRequest ? (
                <BsCheck />
              ) : formState.isSubmitSuccessful && isSuccessRequest === false ? (
                <RxCross2 />
              ) : null
            }
            isDisabled={formState.isSubmitting}>
            Submit
          </Button>
        </DrawerFooter>
      </form>
    </Box>
  );
};

export default SignUpForm;
