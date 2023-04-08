import React, { useEffect, useState } from 'react';
import { getMenuNamesData } from '../../utils/data_utils/dataUtils.js';
import { CustomIconButton } from './sideBarComponents.js';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
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
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { TfiLayoutGrid3Alt, TfiLayoutGrid2 } from 'react-icons/tfi';
import { BsCart4 } from 'react-icons/bs';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { ImUserTie } from 'react-icons/im';
import Logo from '../ui/Logo.jsx';
import Main from '../../pages/Main';
import { useSelector } from 'react-redux';
import { signOut } from '../../firebase/auth';

/* ****************************************************************************************** */

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const user = useSelector((store) => store.user);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
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
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} onOpenLogin={onOpenLogin} user={user} />
      <Box ml={{ base: 0, md: 52 }} p="4">
        <Main isOpen={isOpenLogin} onClose={onCloseLogin} />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const [menuItems, setmenuItems] = useState(null);
  const icons = [
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
    TfiLayoutGrid2,
    TfiLayoutGrid3Alt,
  ];
  useEffect(() => {
    getMenuNamesData().then((data) => {
      icons.forEach((icon, index) => (data[index].icon = icons[index]));
      setmenuItems(data);
    });
  }, [setmenuItems]);

  return (
    <Box
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
        marginBlockEnd="10px">
        <Link href="/home" display="flex" justifyContent="center" m="20px 0">
          <Logo width={{ base: '20%', md: '40%' }} />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {menuItems?.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          fontSize="xs"
          color="gray.500">
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
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
    </Link>
  );
};

const MobileNav = ({ onOpen, onOpenLogin, user, ...rest }) => {
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

      <Logo width="8%" display={{ base: 'flex', md: 'none' }} />

      <HStack spacing={{ base: '3', md: '6' }}>
        {user && (
          <CustomIconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<BsCart4 />}
          />
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
                  _hover={{ borderBottom: 'gray 1px solid' }}>
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
                  <MenuItem>Mis Datos</MenuItem>
                  <MenuItem>Mis Ordenes</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={signOut}>Cerrar sesión</MenuItem>
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
