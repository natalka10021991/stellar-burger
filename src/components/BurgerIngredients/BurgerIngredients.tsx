import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientElement from '../IngredientElement/IngredientElement';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { getBurgerIngredients } from '../../services/utils';
import { Outlet } from 'react-router-dom';
import { IIngredient } from '../../utils/types';

function BurgerIngredients() {
  const [refBun, inViewBun] = useInView();
  const [refSauce, inViewSauce] = useInView();
  const [refMain, inViewMain] = useInView();

  useEffect(
    () => setState(inViewBun ? 'bun' : inViewSauce ? 'sauce' : inViewMain ? 'main' : 'main'),

    [inViewBun, inViewSauce, inViewMain]
  );

  const burgerIngredients = useSelector(getBurgerIngredients);
  const [state, setState] = useState('bun');

  const getType = (type: string) => {
    return burgerIngredients.filter((item: IIngredient) => item.type === type);
  };

  return (
    <div className={burgerIngredientsStyles.wrapper}>
      <div className={burgerIngredientsStyles.tabsWrapper}>
        <Tab value='bun' active={state === 'bun'} onClick={() => setState('bun')}>
          Булки
        </Tab>
        <Tab value='sauce' active={state === 'sauce'} onClick={() => setState('sauce')}>
          Соусы
        </Tab>
        <Tab value='main' active={state === 'main'} onClick={() => setState('main')}>
          Начинки
        </Tab>
      </div>
      <div className={burgerIngredientsStyles.ingredients}>
        <div>
          <h2 className={burgerIngredientsStyles.title}>Булки</h2>
          <div className={burgerIngredientsStyles.ingredientsWrapper} ref={refBun}>
            {getType('bun').map((item: IIngredient) => {
              return <IngredientElement data={item} key={item._id} />;
            })}
          </div>
        </div>

        <div>
          <h2 className={burgerIngredientsStyles.title}>Соусы</h2>
          <div className={burgerIngredientsStyles.ingredientsWrapper} ref={refSauce}>
            {getType('sauce').map((item: IIngredient) => {
              return <IngredientElement data={item} key={item._id} />;
            })}
          </div>
        </div>

        <div>
          <h2 className={burgerIngredientsStyles.title}>Начинки</h2>
          <div className={burgerIngredientsStyles.ingredientsWrapper} ref={refMain}>
            {getType('main').map((item: IIngredient) => {
              return <IngredientElement data={item} key={item._id} />;
            })}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default BurgerIngredients;
