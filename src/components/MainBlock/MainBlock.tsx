import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getBurgerIngredients, getDraggedElements } from '../../services/utils';
import { addIngredient } from '../../services/store/burgerConstructor';
import { IIngredient } from '../../utils/types';

import mainBlockStyles from './MainBlock.module.css';

function MainBlock() {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(getBurgerIngredients);
  const draggedElements = useSelector(getDraggedElements);

  const handleDrop = (element: IIngredient) => {
    dispatch(
      addIngredient({
        ingredient: { ...element, id: Math.random() },
        ingredients: burgerIngredients,
      })
    );
  };

  return (
    <div>
      <h1>Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <div className={mainBlockStyles.wrapper}>
          <BurgerIngredients />
          <BurgerConstructor elements={draggedElements} onDropHandler={handleDrop} />
        </div>
      </DndProvider>
    </div>
  );
}

export default MainBlock;
