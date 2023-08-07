import React /* , { useEffect } */ from 'react';
/* import { useDispatch } from 'react-redux'; */
import { ChakraProvider } from '@chakra-ui/react';
/* import { auth, getUserFromDB } from './firebase/auth'; */
/* import { onAuthStateChanged } from 'firebase/auth'; */
/* import * as userActions from './redux/user/userActions'; */
import SidebarWithHeader from './components/sidebar_with_header/Sidebar_Header.js';
/* import { getOrders } from './firebase/firestore';
import { getOrdersAction } from './redux/orders/ordersActions'; */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <ChakraProvider breakpoints={['xl', ' lg', 'md', 'sm', 'xs']}>
        <SidebarWithHeader />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
