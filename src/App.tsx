import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {
  CartStateType,
  getCartData,
  sendCartData,
} from './store/slices/cartSlice';
import { AppRootState } from './store/store';
import StatusBarMessage, {
  StatusBarMessagePropsType,
} from './components/UI/StatusBarMessage';
import { useAppDispatch, useAppSelector } from './hooks/hooks';

let isInitialRunning = true;

const App = (): JSX.Element => {
  // with default useSelector

  // const isCartVisible = useSelector<AppRootState, boolean>(
  //   (state) => state.cart.isCartVisible
  // );

  // with custom useSelector
  const isCartVisible = useAppSelector((state) => state.cart.isCartVisible);

  const cart = useSelector<AppRootState, CartStateType>((state) => state.cart);
  const statusMessage = useSelector<AppRootState, StatusBarMessagePropsType>(
    (state) => state.main.statusMessage
  );

  const dispatch = useAppDispatch();

  useEffect(()=>{dispatch(getCartData())},[])

  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }
    if (cart.isCartContentChanged) dispatch(sendCartData(cart.cartItems));
    
  }, [cart, dispatch]);

  return (
    <>
      {statusMessage.status && (
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
};

export default App;
