import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType, ProductType } from '../../types/types';
import { findCartItemIndex } from '../../utils/findCartItemIndex';

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
      const itemIndex = findCartItemIndex(state.cartItems, action.payload.id);

      itemIndex === -1
        ? (state.cartItems = [
            {
              id: action.payload.id,
              title: action.payload.title,
              quantity: 1,
              price: action.payload.price,
              total: action.payload.price,
            },
            ...state.cartItems,
          ])
        : (state.cartItems[itemIndex] = {
            ...state.cartItems[itemIndex],
            quantity: state.cartItems[itemIndex].quantity++,
            total: state.cartItems[itemIndex].total + action.payload.price,
          });
    },
    decreaseItemInCart: (state, action: PayloadAction<CartItemType>) => {
      const itemIndex = findCartItemIndex(state.cartItems, action.payload.id);
      if (itemIndex === -1) return state;
      const itemsAfterUpdate =
        state.cartItems[itemIndex].quantity === 1
          ? state.cartItems.filter((item) => item.id !== action.payload.id)
          : state.cartItems.map((item) =>
              item.id !== action.payload.id
                ? item
                : {
                    ...item,
                    quantity: item.quantity--,
                    total: item.total - action.payload.price,
                  }
            );
      state.cartItems = itemsAfterUpdate;
    },
    increaseItemInCart: (state, action: PayloadAction<CartItemType>) => {
      const itemIndex = findCartItemIndex(state.cartItems, action.payload.id);
      if (itemIndex === -1) return state;
      state.cartItems[itemIndex].quantity++;
      state.cartItems[itemIndex].total =
        state.cartItems[itemIndex].total + action.payload.price;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
