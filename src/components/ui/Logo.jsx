import React from 'react';
import logoUrl from '../../assets/logo.jpg';
import { Image } from '@chakra-ui/react';

const Logo = ({ ...rest }) => {
  return <Image src={logoUrl} alt="logo" {...rest} />;
};

export default Logo;
