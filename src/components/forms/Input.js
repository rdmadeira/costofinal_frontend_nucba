import React from 'react';
import { Input } from '@chakra-ui/react';

const LoginInput = React.forwardRef(function refFor({ ...attrs }, ref) {
  return (
    <Input
      ref={ref}
      {...attrs}
      backgroundColor={'green.50'}
      variant={'outline'}
      required={false}
    />
  );
});

export default LoginInput;
