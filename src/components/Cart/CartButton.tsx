import { useSelector, useDispatch } from 'react-redux';

import { AppRootState } from '../../store/store';
import { CartItemType } from '../../types/types';
import { cartActions } from '../../store/slices/cartSlice';

import styles from './CartButton.module.css';

const CartButton = (): JSX.Element => {
  const cartItems = useSelector<AppRootState, CartItemType[]>(
    (state) => state.cart.cartItems
  );
  const dispatch = useDispatch();

  const toggleCartHandler = (): void => {
    dispatch(cartActions.showHideCart());
  };
  const amountItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <button className={styles.button} onClick={toggleCartHandler}>
      <span>Корзина</span>
      <span className={styles.badge}>{amountItems | 0}</span>
    </button>
  );
};

export default CartButton;
