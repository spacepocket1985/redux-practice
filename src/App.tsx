import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { AppRootState } from './store/store';

const App = (): JSX.Element => {
  const isCartVisible = useSelector<AppRootState, boolean>(
    (state) => state.cart.isCartVisible
  );
  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
};

export default App;
