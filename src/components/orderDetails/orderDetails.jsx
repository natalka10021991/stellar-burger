import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import orderDetailsStyles from './orderDetails.module.css';

function OrderDetails() {
  const orderDetails = useSelector((store) => store.createOrder.orderDetails);
  return (
    <div className={orderDetailsStyles.wrapper}>
      <p className={`${orderDetailsStyles.title} text text_type_digits-large mb-8`}>{orderDetails.order.number}</p>
      <p className='text text_type_main-default mb-15'>идентификатор заказа</p>
      <div className={orderDetailsStyles.icon}>
        <CheckMarkIcon type='primary' />
      </div>
      <p className='text text_type_main-small mt-15 mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
