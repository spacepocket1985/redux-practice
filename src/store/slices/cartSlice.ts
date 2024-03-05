import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType, ProductType } from '../../types/types';

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
    addItemToCart: (state, action: PayloadAction<ProductType>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      
        itemIndex === -1
          ? state.cartItems  = [
              {
                id: action.payload.id,
                title: action.payload.title,
                quantity: 1,
                price: action.payload.price,
                total: action.payload.price,
              },
              ...state.cartItems,
            ]
          : state.cartItems[itemIndex] = {
            ...state.cartItems[itemIndex],
            quantity: ++state.cartItems[itemIndex].quantity,
            price: state.cartItems[itemIndex].price + action.payload.price,
          }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
