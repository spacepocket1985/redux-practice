import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { mainActions } from './store/slices/mainSlice';
import { CartStateType } from './store/slices/cartSlice';
import { AppRootState } from './store/store';
import { StatusBarMessagePropsType } from './components/UI/StatusBarMessage';

const App = (): JSX.Element => {
  const isCartVisible = useSelector<AppRootState, boolean>(
    (state) => state.cart.isCartVisible
  );
  const cart = useSelector<AppRootState, CartStateType>((state) => state.cart);
  const statusMessage = useSelector<AppRootState, StatusBarMessagePropsType>(state=>state.main.statusMessage)

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(mainActions.showStatusMessage({
        status: 'pending',
        title: 'Отправка данных',
        message: 'Данные корзины отправляются'
      }))
      const response = await fetch(
        'https://foodorder-35bc5-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) throw new Error('Ошибка про отправке данных корзины');

      const responseData = response.json;

      dispatch(mainActions.showStatusMessage({
        status: 'success',
        title: 'Данные отправлены успешно',
        message: 'Данные корзины успешно отправлены!'
      }))
    };
    sendCartData().catch((error)=>{
      if (error instanceof Error) {
        
      dispatch(mainActions.showStatusMessage({
        status: 'error',
        title: 'Ошибка отправки данных',
        message: error.message
      }))
      }
    })
  }, [cart]);

  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
};

export default App;
