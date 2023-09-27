import React from 'react';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import PropTypes from 'prop-types';
import mainBlockStyles from './mainBlock.module.css';
import { ingredientPropTypes } from '../../utils/types';

function MainBlock({ data }) {
  return (
    <div>
      <h1>Соберите бургер</h1>
      <div className={mainBlockStyles.wrapper}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </div>
  );
}

MainBlock.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default MainBlock;
