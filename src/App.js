import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
/* import ThemeProvider from 'react-bootstrap/ThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css'; */

/* import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx'; */
import SidebarWithHeader from './components/sidebar_with_header/Sidebar_Header.js';

function App() {
  return (
    <ChakraProvider breakpoints={['xl', ' lg', 'md', 'sm', 'xs']}>
      {/* <Header />
      <Sidebar /> */}
      <SidebarWithHeader />
    </ChakraProvider>
  );
}

export default App;
