import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

import { ProductType } from '../../types/types';

const initialState: Array<ProductType> = [
  {
    id: v1(),
    title: 'Супер-Товар',
    price: 10,
    description:
      'Благодаря своему высокому качеству, этот товар прослужит вам очень долго.',
  },
  {
    id: v1(),
    title: 'Популярный-Товар',
    price: 5,
    description: 'Самый часто популярный товар среди наших плкупателей.',
  },
  {
    id: v1(),
    title: 'Новый -Товар',
    price: 7,
    description: 'Внимание новинка!',
  },
];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductType>) => {
      state.push(action.payload);
    },
  },
});

export const producrtActions = productsSlice.actions;
export default productsSlice.reducer;
