import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from '../ingredientElement/ingredientElement';
import { PropTypes } from 'prop-types';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import { ingredientPropTypes } from '../../utils/types';

function BurgerIngredients({ data }) {
  const [state, setState] = useState({
    current: 'bun',
    data: data,
  });

  const getType = (type) => {
    return state.data.filter((item) => item.type === type);
  };

  return (
    <div className={burgerIngredientsStyles.wrapper}>
      <div className={burgerIngredientsStyles.tabsWrapper}>
        <Tab
          value='bun'
          active={state.current === 'bun'}
          onClick={() => setState({ current: 'bun' })}
        >
          Булки
        </Tab>
        <Tab
          value='sauce'
          active={state.current === 'sauce'}
          onClick={() => setState({ current: 'sauce' })}
        >
          Соусы
        </Tab>
        <Tab
          value='main'
          active={state.current === 'main'}
          onClick={() => setState({ current: 'main' })}
        >
          Начинки
        </Tab>
      </div>
      <div className={burgerIngredientsStyles.ingredients}>
        <div>
          <h2 className={burgerIngredientsStyles.title}>Булки</h2>
          <div className={burgerIngredientsStyles.ingredientsWrapper}>
            {getType('bun').map((item) => {
              return <IngredientElement data={item} key={item._id} />;
            })}
          </div>
        </div>

        <div>
          <h2 className={burgerIngredientsStyles.title}>Соусы</h2>
          <div className={burgerIngredientsStyles.ingredientsWrapper}>
            {getType('sauce').map((item) => {
              return <IngredientElement data={item} key={item._id} />;
            })}
          </div>
        </div>

        <div>
          <h2 className={burgerIngredientsStyles.title}>Начинки</h2>
          <div className={burgerIngredientsStyles.ingredientsWrapper}>
            {getType('main').map((item) => {
              return <IngredientElement data={item} key={item._id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
