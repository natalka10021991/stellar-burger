import { createPortal } from 'react-dom';
import ModalOverlay from '../modalOverlay/modalOverlay';
import PropTypes from 'prop-types';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetailsStyles from './orderDetails.module.css';

const modalRoot = document.getElementById('modals');

function OrderDetails({ setIsOpen }) {
  return createPortal(
    <ModalOverlay setIsOpen={setIsOpen}>
      <div className={orderDetailsStyles.wrapper}>
        <p className={`${orderDetailsStyles.title} text text_type_digits-large mb-8`}>034536</p>
        <p className='text text_type_main-default mb-15'>идентификатор заказа</p>
        <div className={orderDetailsStyles.icon}>
          <CheckMarkIcon type='primary' />
        </div>
        <p className='text text_type_main-small mt-15 mb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

OrderDetails.propTypes = {
  setIsOpen: PropTypes.func,
};

export default OrderDetails;
