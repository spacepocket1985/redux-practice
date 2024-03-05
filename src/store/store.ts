
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import productReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice'

const rootReducer = combineReducers({ products: productReducer, cart:cartReducer });

export const store = configureStore({ reducer: rootReducer });
export type AppRootState = ReturnType<typeof rootReducer>;
