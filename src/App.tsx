import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { mainActions } from './store/slices/mainSlice';
import { CartStateType } from './store/slices/cartSlice';
import { AppRootState } from './store/store';
import StatusBarMessage, {
  StatusBarMessagePropsType,
} from './components/UI/StatusBarMessage';

let isInitialRunning = true;

const App = (): JSX.Element => {
  const isCartVisible = useSelector<AppRootState, boolean>(
    (state) => state.cart.isCartVisible
  );
  const cart = useSelector<AppRootState, CartStateType>((state) => state.cart);
  const statusMessage = useSelector<AppRootState, StatusBarMessagePropsType>(
    (state) => state.main.statusMessage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        mainActions.showStatusMessage({
          status: 'pending',
          title: 'Отправка данных',
          message: 'Данные корзины отправляются',
        })
      );
      const response = await fetch(
        'https://foodorder-35bc5-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) throw new Error('Ошибка про отправке данных корзины');

      dispatch(
        mainActions.showStatusMessage({
          status: 'success',
          title: 'Данные отправлены успешно',
          message: 'Данные корзины успешно отправлены!',
        })
      );
    };

    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }

    sendCartData().catch((error) => {
      if (error instanceof Error) {
        dispatch(
          mainActions.showStatusMessage({
            status: 'error',
            title: 'Ошибка отправки данных',
            message: error.message,
          })
        );
      }
    });
  }, [cart, dispatch]);

  return (
    <>
      {' '}
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
