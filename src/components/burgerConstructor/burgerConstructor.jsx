import React from 'react';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import burgerConstructorStyles from './burgerConstructor.module.css';

class BurgerConstructor extends React.Component {
  constructor(props) {
    super();
    this.state = { data: props.data };
  }

  render() {
    return (
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
            {this.state.data.map((item, i) => {
              return (
                <div className={burgerConstructorStyles.ingredientWrapper}>
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
          <Button htmlType='button' type='primary' size='large'>
            Оформить заказ
          </Button>
        </div>
      </div>
    );
  }
}

export default BurgerConstructor;
