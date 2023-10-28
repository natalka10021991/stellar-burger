import React from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';
import ingredientElementStyle from './ingredientElement.module.css';
import { useDrag } from 'react-dnd';
import { getDraggedElements } from '../../services/utils';
import { Link, useLocation } from 'react-router-dom';

function IngredientElement({ data }) {
  let location = useLocation();
  const draggedElements = useSelector(getDraggedElements);
  const counter = draggedElements.filter((item) => item._id === data._id).length;


  const [{ isDrag }, dragRef] = useDrag({
    type: 'burgerIngredient',
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <Link to={`ingredients/${data._id}`} state={{ backgroundLocation: location }} className={`${ingredientElementStyle.link} text text_type_main-medium`}>
      <div
        className={ingredientElementStyle.element}
        
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
    </Link>
  );
}

IngredientElement.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default IngredientElement;
