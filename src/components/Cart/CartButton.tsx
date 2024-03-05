import styles from './CartButton.module.css';

const CartButton = (): JSX.Element => {
  return (
    <button className={styles.button}>
      <span>Корзина</span>
      <span className={styles.badge}>2</span>
    </button>
  );
};

export default CartButton;
