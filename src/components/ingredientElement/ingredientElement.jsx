import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropTypes } from '../../utils/types';
import ingredientElementStyle from './ingredientElement.module.css';

function IngredientElement({ data }) {
  return (
    <div className={ingredientElementStyle.element}>
      <Counter count={1} size='default' extraClass='m-1' />
      <img src={data.image} alt={data.name} />
      <p className={`${ingredientElementStyle.price} text text_type_digits-default mt-1 mb-1`}>
        {data.price}
        <CurrencyIcon type='primary' />
      </p>
      <p className='text text_type_main-small'>{data.name}</p>
    </div>
  );
}

IngredientElement.propTypes = {
  data: ingredientPropTypes,
};

export default IngredientElement;
