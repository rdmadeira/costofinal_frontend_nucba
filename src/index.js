import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Orders from './pages/Orders';
import Home from './pages/Home';
import Account from './pages/Account';
import UpdatePrice from './pages/UpdatePrice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home />, index: true },
      {
        path: 'products/:product',
        element: <Products />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'update',
        element: <UpdatePrice />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
