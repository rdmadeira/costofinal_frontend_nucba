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
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
/* import Input from './Input';
 */
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const toast = useToast({});
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
        {inputNames.map((name) => {
          return (
            <FormControl key={name} isInvalid={errors[name]} isRequired>
              <FormLabel htmlFor={name}>
                {name[0].toLocaleUpperCase() + name.slice(1)}
              </FormLabel>
              <Input
                {...register(name, {
                  required: { value: true, message: 'Campo obligatório!' },
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
