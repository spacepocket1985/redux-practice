import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType, ProductType } from '../../types/types';
import { findCartItemIndex } from '../../utils/findCartItemIndex';
import { mainActions } from './mainSlice';

export type CartStateType = {
  isCartVisible: boolean;
  cartItems: Array<CartItemType>;
  isCartContentChanged: boolean;
};

const initialState: CartStateType = {
  isCartVisible: false,
  isCartContentChanged: false,
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
      state.isCartContentChanged = true;
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem)
        state.cartItems.push({
          id: action.payload.id,
          title: action.payload.title,
          quantity: 1,
          price: action.payload.price,
          total: action.payload.price,
        });
      else {
        existingItem.quantity++;
        existingItem.total = existingItem.price * existingItem.quantity;
      }
    },
    decreaseItemInCart: (state, action: PayloadAction<CartItemType>) => {
      state.isCartContentChanged = true;
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
                    quantity: --item.quantity,
                    total: item.total - action.payload.price,
                  }
            );
      state.cartItems = itemsAfterUpdate;
    },
    increaseItemInCart: (state, action: PayloadAction<CartItemType>) => {
      state.isCartContentChanged = true;
      const itemIndex = findCartItemIndex(state.cartItems, action.payload.id);
      if (itemIndex === -1) return state;
      state.cartItems[itemIndex].quantity++;
      state.cartItems[itemIndex].total =
        state.cartItems[itemIndex].total + action.payload.price;
    },
    updateCart: (state, action: PayloadAction<CartItemType[]>) => {
      state.cartItems = action.payload;
      state.isCartContentChanged = false;
    },
  },
});

export const sendCartData = (cardData: Array<CartItemType>) => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(
      mainActions.showStatusMessage({
        status: 'pending',
        title: 'Отправка данных',
        message: 'Данные корзины отправляются',
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        'https://foodorder-35bc5-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cardData),
        }
      );
      if (!response.ok) throw new Error('Ошибка про отправке данных корзины');
    };

    try {
      await sendDataHttpRequest();
      dispatch(
        mainActions.showStatusMessage({
          status: 'success',
          title: 'Данные отправлены успешно',
          message: 'Данные корзины успешно отправлены!',
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          mainActions.showStatusMessage({
            status: 'error',
            title: 'Ошибка отправки данных',
            message: error.message,
          })
        );
      }
    }
  };
};

export const getCartData = () => {
  return async (dispatch: Dispatch) => {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        'https://foodorder-35bc5-default-rtdb.firebaseio.com/cart.json'
      );
      if (!response.ok) throw new Error('Ошибка про получении  данных корзины');

      const responseData: CartItemType[] = await response.json();
      console.log('responseData   ==>', responseData);
      if (!responseData) return [];

      return responseData;
    };

    try {
      const cartData = await getDataHttpRequest();
      dispatch(cartActions.updateCart(cartData));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          mainActions.showStatusMessage({
            status: 'error',
            title: 'Ошибка при получении данных корзины',
            message: error.message,
          })
        );
      }
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
