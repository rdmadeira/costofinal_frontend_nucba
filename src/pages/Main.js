import React from 'react';
import {
  DrawerContent,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import SignUpForm from '../components/forms/SignUpForm';

const Main = ({ isOpen, onClose }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size={{ base: 'full', md: 'md' }}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton onClick={onClose} />
        <DrawerHeader>INGRESE A SU CUENTA</DrawerHeader>
        <DrawerBody>
          <SignUpForm />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Main;
