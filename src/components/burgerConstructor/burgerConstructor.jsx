import React, { useState } from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/types';

import burgerConstructorStyles from './burgerConstructor.module.css';
import OrderDetails from '../orderDetails/orderDetails';

function BurgerConstructor({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <div className={burgerConstructorStyles.wrapper}>
          <ConstructorElement
            type='top'
            isLocked
            text='Краторная булка N-200i (верх)'
            price='20'
            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            extraClass=''
          />
          <div className={burgerConstructorStyles.ingredients}>
            {data.map((item) => {
              return (
                <div className={burgerConstructorStyles.ingredientWrapper} key={item._id}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    key={item.id}
                    extraClass='ml-2'
                  />
                </div>
              );
            })}
          </div>
          <ConstructorElement
            type='bottom'
            isLocked
            text='Краторная булка N-200i (низ)'
            price='20'
            thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            extraClass=''
          />
        </div>
        <div className={burgerConstructorStyles.footer}>
          <div className={burgerConstructorStyles.price}>
            <p className='text text_type_digits-medium mr-1'>610 </p>

            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='button' type='primary' size='large' onClick={handleClick}>
            Оформить заказ
          </Button>
        </div>
      </div>
      {isModalOpen && <OrderDetails setIsOpen={setIsModalOpen} />}
    </>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor;
