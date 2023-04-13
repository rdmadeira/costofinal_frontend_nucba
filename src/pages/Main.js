import React, { useState } from 'react';
import {
  DrawerContent,
  Drawer,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SignUpForm from '../components/forms/SignUpForm';

const Main = ({ isOpen, onClose }) => {
  const [isLogin, setisLogin] = useState(true);
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size={{ base: 'full', md: 'md' }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={onClose} />
          <DrawerHeader>
            {isLogin ? 'INGRESE A SU CUENTA' : 'REGISTRESE'}
          </DrawerHeader>
          <DrawerBody>
            <SignUpForm
              onClose={onClose}
              loginState={{ isLogin, setisLogin }}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Outlet />
    </>
  );
};

export default Main;
