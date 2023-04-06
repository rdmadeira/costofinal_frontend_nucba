import React, { useState } from 'react';
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

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ mode: 'onSubmit', reValidateMode: 'onChange' });

  const toast = useToast();

  const onSubmit = (data) => {
    console.log(data);

    isSubmitSuccessful &&
      toast({
        title: 'Login aceptado',
        description: 'Los datos son correctos!',
        status: 'success',
        isClosable: true,
      });
  };

  const [isLogin, setisLogin] = useState(true);

  const inputNames = isLogin
    ? ['username', 'password']
    : ['username', 'password', 'nombre', 'apellido', 'dirección', 'teléfono'];

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={'4'}>
          {inputNames.map((name) => {
            console.log(errors[name]);
            return (
              <FormControl isInvalid={errors[name]} isRequired key={name}>
                <FormLabel htmlFor={name}>
                  {name[0].toLocaleUpperCase() + name.slice(1)}
                </FormLabel>
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({
                    field: { onChange, onBlur, value = '', name },
                  }) => (
                    <Input
                      {...register(name, {
                        required: {
                          value: true,
                          message: 'Campo obligatório!',
                        },
                      })}
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
                  {errors[name] && errors[name].message}
                </FormErrorMessage>
              </FormControl>
            );
          })}
          <Text>
            No tenés cuenta?{' '}
            <button
              type="button"
              onClick={() => setisLogin(!isLogin)}
              style={{ fontWeight: 'bold', color: 'blue' }}>
              Registrese
            </button>
          </Text>
        </VStack>
        <DrawerFooter>
          <Button type="submit" rightIcon={isSubmitting && <Spinner />}>
            Submit
          </Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default SignUpForm;
