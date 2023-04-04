import React from 'react';
/* import { ChakraProvider } from '@chakra-ui/react'; */
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header/Header.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';

function App() {
  return (
    <ThemeProvider breakpoints={['xl', ' lg', 'md', 'sm', 'xs']}>
      <Header />
      <Sidebar />
    </ThemeProvider>
  );
}

export default App;
