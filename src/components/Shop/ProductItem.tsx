import Card from "../UI/Card";
import styles from "./ProductItem.module.css";

type ProductItemPropsType = {
  title: string;
  price: number;
  description: string;
};


const ProductItem = (props:ProductItemPropsType) => {
  const { title, price, description } = props;

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;