import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";
import { CartItemType } from "../../types/types";
import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = ():JSX.Element  => {
  const cartItems = useSelector<AppRootState, CartItemType[]>((state)=>state.cart.cartItems);
  const cartItemsList = cartItems.map((item) => (
    <CartItem item={item}  key={item.id}/>
  ));
  return (
    <Card className={styles.cart}>
      <h2>Мои Покупки</h2>
      <ul>
      {cartItemsList.length > 0
          ? cartItemsList
          : 'Ваша корзина пуста.'}
      </ul>
    </Card>
  );
};

export default Cart;
