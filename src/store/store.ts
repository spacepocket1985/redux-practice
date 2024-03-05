
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import productReducer from './slices/productsSlice';

const rootReducer = combineReducers({ products: productReducer });

export const store = configureStore({ reducer: rootReducer });
export type AppRootState = ReturnType<typeof rootReducer>;
