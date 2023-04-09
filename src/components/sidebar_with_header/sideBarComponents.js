import React from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import styled from 'styled-components';

const CartNumberSpan = styled.span`
  position: absolute;
  right: 4px;
  z-index: 300;
  font-size: 10px;
  color: white;
  border-radius: 50%;
  padding: 0px 5px;
  background: red;
`;

export const CustomIconButton = ({ cartNum, ...rest }) => {
  return (
    <Box pos="relative">
      <CartNumberSpan>{cartNum}</CartNumberSpan>
      <IconButton {...rest} />
    </Box>
  );
};
