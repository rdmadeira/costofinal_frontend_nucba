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
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import Input from './Input';
import { BsCheck } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { createUser } from '../../firebase/firebaseConfig';

const SignUpForm = () => {
  const { register, handleSubmit, control, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const [isLogin, setisLogin] = useState(true);
  const [isSuccessRequest, setisSuccessRequest] = useState(null);
  const toast = useToast();

  /*  useEffect(() => {
    console.log(formState.isSubmitting, formState.isSubmitSuccessful);
  }, [formState]); */

  const onSubmit = (data) => {
    if (!isLogin) {
      return createUser(data).then((res) => {
        if (res.isSuccesful) {
          setisSuccessRequest(true);
          toast({
            title: 'Cliente ' + res.message,
            description: 'Creado con sucesso',
            status: 'success',
            isClosable: true,
          });
        } else {
          setisSuccessRequest(false);
          toast({
            title: 'Email ya registrado',
            description: res.message,
            status: 'error',
            isClosable: true,
          });
        }
      });
    }
  };

  const inputNames = isLogin
    ? ['email', 'password']
    : ['email', 'password', 'name', 'lastname', 'address', 'phone'];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={'4'}>
          {inputNames.map((name) => {
            return (
              <FormControl
                isInvalid={formState.errors[name]}
                width="75%"
                isRequired
                key={name}>
                <FormLabel htmlFor={name}>
                  {name[0].toLocaleUpperCase() + name.slice(1)}
                </FormLabel>
                <Controller
                  name={name}
                  rules={{
                    required: {
                      value: true,
                      message: 'Campo obligatório!',
                    },
                  }}
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
                        name === 'password'
                          ? 'password'
                          : name === 'teléfono'
                          ? 'tel'
                          : 'text'
                      }
                      onChange={onChange}
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
              ) : formState.isSubmitSuccessful && !isSuccessRequest ? (
                <RxCross2 />
              ) : null
            }
            isDisabled={formState.isSubmitting}>
            Submit
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default SignUpForm;
