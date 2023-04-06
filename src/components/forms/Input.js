import React from 'react';
import { Input } from '@chakra-ui/react';

const LoginInput = ({ ...attrs }) => {
  return (
    <Input
      {...attrs}
      backgroundColor={'green.50'}
      variant={'outline'}
      required={false}
    />
  );
};

export default LoginInput;
