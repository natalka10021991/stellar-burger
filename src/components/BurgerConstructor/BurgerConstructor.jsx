import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper';

import { useSelector, useDispatch } from 'react-redux';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';

import burgerConstructorStyles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDrop } from 'react-dnd';
import { createOrder } from '../../services/store/orderDetails';
import BurgerConstructorInner from '../BurgerConstructorInner/BurgerConstructorInner';
import { getDraggedElements } from '../../services/utils';
import { useNavigate } from 'react-router-dom';

function BurgerConstructor({ elements, onDropHandler }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bun, setBun] = useState({});
  const [elementsWithoutBun, setElementsWithoutBun] = useState([]);
  const [price, setPrice] = useState(null);
  const draggedElements = useSelector(getDraggedElements);
  const orderNumber = useSelector((store) => store.createOrder.orderDetails.order.number);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const isUserLoggedIn = user.user.email && user.user.name;
  const handleClick = () => {
    if (!isUserLoggedIn) {
      navigate('/login');
    } else {
      dispatch(createOrder(draggedElements.map((item) => item._id)));
      setIsModalOpen(true);
    }
  };
  const [, dropTarget] = useDrop({
    accept: 'burgerIngredient',
    drop(item) {
      onDropHandler(item);
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const findCard = useCallback(
    (id) => {
      const card = elementsWithoutBun.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: elementsWithoutBun.indexOf(card),
      };
    },
    [elementsWithoutBun]
  );

  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setElementsWithoutBun(
        update(elementsWithoutBun, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, elementsWithoutBun, setElementsWithoutBun]
  );

  const [, drop] = useDrop(() => ({ accept: 'burgerConstructorElement' }));

  useEffect(() => {
    setBun(elements.find((item) => item.type === 'bun'));
    setElementsWithoutBun(elements.filter((item) => item.type !== 'bun'));
  }, [elements]);

  useEffect(() => {
    setPrice(
      draggedElements.reduce((sum, current) => {
        if (current.type === 'bun') return sum + current.price * 2;
        return sum + current.price;
      }, 0)
    );
  }, [draggedElements]);
  return (
    <>
      <div className={burgerConstructorStyles.wrapper}>
        <div className={burgerConstructorStyles.ingredientsWrapper} ref={dropTarget}>
          {elements && elements.length && elementsWithoutBun ? (
            <>
              {bun && (
                <ConstructorElement
                  type='top'
                  isLocked
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  extraClass=''
                />
              )}
              <div className={burgerConstructorStyles.ingredients} ref={drop}>
                {elementsWithoutBun.map((item, index) => (
                  <BurgerConstructorInner
                    item={item}
                    key={item.id}
                    id={`${item.id}`}
                    moveCard={moveCard}
                    findCard={findCard}
                  />
                ))}
              </div>
              {bun && (
                <ConstructorElement
                  type='bottom'
                  isLocked
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  extraClass=''
                />
              )}
            </>
          ) : (
            <h2>Добавьте ингредиенты в ваш бургер</h2>
          )}
        </div>
        <div className={burgerConstructorStyles.footer}>
          <div className={burgerConstructorStyles.price}>
            <p className='text text_type_digits-medium mr-1'>{price} </p>

            <CurrencyIcon type='primary' />
          </div>
          <Button htmlType='button' type='primary' size='large' onClick={handleClick}>
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalOpen && !!orderNumber && (
        <Modal title='' closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
