import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from 'redux';
import addressReducer from './addressSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import productReducer from './productSlice';
import sampleDataReducer from './sampledataSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  address: addressReducer,
  cart: cartReducer,
  orders: orderReducer,
  product: productReducer,
  sampleData: sampleDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };

