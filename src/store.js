import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'


import appSlice from './store/appSlice';


const reducers = combineReducers({
  app: appSlice   
});
 
 const persistConfig = {
     key: 'root',
     storage
 };
 
const persistedReducer = persistReducer(persistConfig, reducers);
 

 
export const store = configureStore({
     reducer: persistedReducer
});
 

export const  persistor = persistStore(store);

