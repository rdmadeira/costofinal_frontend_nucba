import React, { createContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CustomIconButton } from './sideBarComponents.js';
import {
  Modal,
  ModalBody,
  ModalContent,
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Hide,
  ModalOverlay,
  Spinner,
  ModalHeader,
  ModalFooter,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { TfiLayoutGrid3Alt, TfiLayoutGrid2 } from 'react-icons/tfi';
import { BsCart4 } from 'react-icons/bs';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { ImUserTie } from 'react-icons/im';
import Logo from '../ui/Logo.jsx';
import Main from '../../pages/Main';
import { signOut } from '../../firebase/auth';
import { NavLink } from 'react-router-dom';
import useGetCategories from '../../hooks/useGetCategories';
// import { useCallback } from 'react';

/* ****************************************************************************************** */

export const OpenLoginContext = createContext(null);
export const arrayQtyTen = createContext(null);

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: signoutIsOpen,
    onOpen: signoutOnOpen,
    onClose: signoutOnClose,
  } = useDisclosure();

  const user = useSelector((store) => store.user);

  return (
    <OpenLoginContext.Provider value={onOpenLogin}>
      <Box minH="100vh" bg="green.50">
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          /* autoFocus={false} */
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>

        <Modal isOpen={signoutIsOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Saliendo...</ModalHeader>
            <ModalBody>
              <Box padding="5">
                <Spinner />
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>

        <MobileNav
          boxShadow="3px 2px 5px 0px #00000036"
          position="relative"
          zIndex="5"
          onOpen={onOpen}
          onOpenLogin={onOpenLogin}
          signoutOnOpen={signoutOnOpen}
          signoutOnClose={signoutOnClose}
          user={user}
        />
        <Box ml={{ base: 0, md: 52 }} p="0">
          <Main isOpen={isOpenLogin} onClose={onCloseLogin} />
        </Box>
      </Box>
    </OpenLoginContext.Provider>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { data: categoriesData } = useGetCategories();

  const icons = [
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
    TfiLayoutGrid2,
  ];

  return (
    <Box
      boxShadow={'2px 0px 5px 0px #00000036'}
      transition="3s ease"
      bg={useColorModeValue('green.50', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('green.100', 'gray.700')}
      w={{ base: 'full', md: 52 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        /* marginBlockEnd="10px" */
      >
        <NavLink to="/">
          <Logo width={{ base: '20%', md: '40%' }} />
        </NavLink>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {categoriesData?.data?.map((category, index) => (
        <NavLink
          to={`products/${category.path}`}
          key={category.name}
          onClick={onClose}>
          <NavItem
            icon={icons[index]}
            fontSize={{ base: 'md', md: 'xs' }}
            /* padding={'3'} */
            marginX={'0'}
            color="gray.500">
            {category.name}
          </NavItem>
        </NavLink>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'green.300',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({
  onOpen,
  onOpenLogin,
  signoutOnOpen,
  signoutOnClose,
  user,
  ...rest
}) => {
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();

  const navigateHandle = (path) => {
    navigate(path);
  };
  const signOutHandle = () => {
    signoutOnOpen();
    signOut().then(() => {
      signoutOnClose();
      navigate('/');
    });
  };

  return (
    <Flex
      ml={{ base: 0, md: 52 }}
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={useColorModeValue('green.50', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Logo
        width="12%"
        maxWidth="56px"
        display={{ base: 'flex', md: 'none' }}
        position="absolute"
        left="calc(50vw - 4%)"
      />

      <HStack spacing={{ base: '3', md: '6' }}>
        {user && (
          <NavLink to="/cart">
            <CustomIconButton
              cartNum={cart && cart.length}
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<BsCart4 />}
            />
          </NavLink>
        )}
        <Flex alignItems={'center'}>
          <Menu>
            {user ? (
              <>
                <MenuButton
                  paddingRight={{ base: '0', md: '5' }}
                  color="gray.500"
                  transition="all 0.3s"
                  borderBottom="transparent 1px solid"
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ borderBottom: 'gray 1px solid' }}
                  zIndex={'500'}>
                  <HStack>
                    <ImUserTie size="25px" />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2">
                      <Text fontSize="sm">{user?.displayName}</Text>
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg={useColorModeValue('white', 'gray.900')}
                  borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <VStack
                    display={{ base: 'flex', md: 'none' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{user.displayName}</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <MenuDivider />
                  <MenuItem onClick={() => navigateHandle('/account')}>
                    Mis Datos
                  </MenuItem>
                  <MenuItem onClick={() => navigateHandle('/orders')}>
                    Mis Ordenes
                  </MenuItem>
                  {user && user.uid === 'UxvS5mtoEwYVUVIL2btZgVIOZsn1' && (
                    <MenuItem onClick={() => navigateHandle('/update')}>
                      Update Prices
                    </MenuItem>
                  )}
                  <MenuDivider />
                  <MenuItem onClick={signOutHandle}>Cerrar sesión</MenuItem>
                </MenuList>
              </>
            ) : (
              <Button
                onClick={onOpenLogin}
                rightIcon={<RiAccountPinCircleFill />}
                color="gray.500"
                variant="outline">
                {<Hide below="md">Ingresar</Hide>}
              </Button>
            )}
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
