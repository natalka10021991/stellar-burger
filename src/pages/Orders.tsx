import pagesStyles from './styles.module.css';
import { useEffect } from 'react';
import {
  connect as connectOrders,
  disconnect as disconnectOrders,
} from '../services/orders/actions';
import Order from '../components/Order/Order';
import { useDispatch, useSelector } from '../services/store/store';
import { IOrder } from '../types/data';

const url = 'wss://norma.nomoreparties.space/orders/all';

const Orders = () => {
  const dispatch = useDispatch();
  const connect = () => dispatch(connectOrders(url));
  const disconnect = () => dispatch(disconnectOrders());

  const orders = useSelector((store) => store.orders);
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);
  return (
    <div className={pagesStyles.feedWrapper}>
      <h1>Лента заказов</h1>
      <div className={pagesStyles.feedInner}>
        <div className={pagesStyles.feedOrders}>
          {orders.orders?.orders?.length
            ? orders.orders.orders.map((order: IOrder) => <Order key={order._id} data={order} />)
            : 'Заказов нет'}
        </div>

        <div>
          <div className={pagesStyles.feedOrderList}>
            <div className='mr-9'>
              <h3 className='text text_type_main-medium'>Готовы:</h3>
              <div>
                <p className='text text_type_digits-default'>034533</p>
              </div>
            </div>

            <div>
              <h3 className='text text_type_main-medium'>В работе:</h3>
              <p className='text text_type_digits-default'>034533</p>
            </div>
          </div>
          <div className='mb-15'>
            <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
            <p className='text text_type_digits-large'>{orders.orders.total}</p>
          </div>
          <div>
            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
            <p className='text text_type_digits-large'>{orders.orders.totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
