import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { userReducer } from './user/userReducer';
import { cartReducer } from './cart/cartReducer';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
