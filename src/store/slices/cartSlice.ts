import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/types';

type CartStateType = {
  isCartVisible: boolean;
  cartItems: Array<CartItemType>;
};

const initialState: CartStateType = {
  isCartVisible: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showHideCart: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
