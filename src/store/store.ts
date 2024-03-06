
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice'
import mainReducer from './slices/mainSlice'

const rootReducer = combineReducers({ products: productReducer, cart:cartReducer, main:mainReducer });

export type AppDispatch = typeof store.dispatch

export const store = configureStore({ reducer: rootReducer });
export type AppRootState = ReturnType<typeof rootReducer>;

