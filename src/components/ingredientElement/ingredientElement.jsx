import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';
import ingredientElementStyle from './ingredientElement.module.css';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import Modal from '../modal/modal';
import { useDrag } from 'react-dnd';

function IngredientElement({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const draggedElements = useSelector((store) => store.burgerConstructor.draggedIngredients);
  const counter = draggedElements.filter((item) => item._id === data._id).length;
  const handleClick = () => {
    setIsOpen(true);
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: 'burgerIngredient',
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <>
      <div
        className={ingredientElementStyle.element}
        onClick={handleClick}
        ref={dragRef}
        style={{ border: isDrag ? '1px solid #4C4CFF' : '' }}
      >
        {!!counter && <Counter count={counter} size='default' extraClass='m-1' />}

        <img src={data.image} alt={data.name} />
        <p className={`${ingredientElementStyle.price} text text_type_digits-default mt-1 mb-1`}>
          {data.price}
          <CurrencyIcon type='primary' />
        </p>
        <p className='text text_type_main-small'>{data.name}</p>
      </div>
      {isOpen && (
        <Modal title={'Детали ингредиента'} setIsOpen={setIsOpen}>
          <IngredientDetails ingredient={data} />
        </Modal>
      )}
    </>
  );
}

IngredientElement.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default IngredientElement;
