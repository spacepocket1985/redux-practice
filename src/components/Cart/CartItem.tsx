import { useDispatch } from 'react-redux';
import { CartItemType } from '../../types/types';
import styles from './CartItem.module.css';
import { cartActions } from '../../store/slices/cartSlice';

type CartItemPropsType = {
  item: CartItemType;
};

const CartItem = (props: CartItemPropsType): JSX.Element => {
  const { title, quantity, total, price} = props.item;

  const dispatch = useDispatch();
  const onDecreaseItemHandler = (item:CartItemType)=>dispatch(cartActions.decreaseItemInCart(item))
  const onIncreaseItemHandler = (item:CartItemType)=>dispatch(cartActions.increaseItemInCart(item))

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{' '}
          <span className={styles['item-price']}>
            (${price.toFixed(2)} / шт.)
          </span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={()=>{onDecreaseItemHandler(props.item)}}>-</button>
          <button onClick={()=>{onIncreaseItemHandler(props.item)}}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
