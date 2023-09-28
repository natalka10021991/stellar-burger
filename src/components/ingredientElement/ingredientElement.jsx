import React, { useState } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';
import ingredientElementStyle from './ingredientElement.module.css';
import IngredientDetails from '../ingredientDetails/ingredientDetails';

function IngredientElement({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      setIsOpen(false);
    }
  }

  return (
    <>
      <div className={ingredientElementStyle.element} onClick={handleClick} onKeyDown={handleKeyDown} tabIndex="0">
        <Counter count={1} size='default' extraClass='m-1' />
        <img src={data.image} alt={data.name} />
        <p className={`${ingredientElementStyle.price} text text_type_digits-default mt-1 mb-1`}>
          {data.price}
          <CurrencyIcon type='primary' />
        </p>
        <p className='text text_type_main-small'>{data.name}</p>
      </div>
      {isOpen && <IngredientDetails title={'Детали ингредиента'} ingredient={data} setIsOpen={setIsOpen} />}
    </>
  );
}

IngredientElement.propTypes = {
  data: ingredientPropTypes,
};

export default IngredientElement;
