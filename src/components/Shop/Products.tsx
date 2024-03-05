import { useSelector } from 'react-redux';

import { AppRootState } from '../../store/store';
import { ProductType } from '../../types/types';
import ProductItem from './ProductItem';

import styles from './Products.module.css';

const Products = (): JSX.Element => {
  const products = useSelector<AppRootState, Array<ProductType>>(
    (state) => state.products
  );
  const productList = products.map((product) => (
    <ProductItem item={product}  key={product.id}/>
  ));
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {productList.length > 0
          ? productList
          : 'У нас пока нет никаких продуктов'}
      </ul>
    </section>
  );
};

export default Products;
