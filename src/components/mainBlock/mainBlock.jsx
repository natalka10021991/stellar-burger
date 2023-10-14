import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
import BurgerConstructor from '../burgerConstructor/burgerConstructor';
import mainBlockStyles from './mainBlock.module.css';
import { ADD_INGREDIENT } from '../../services/actions/burgerConstructor';
import { getBurgerIngredients, getDraggedElements } from '../../services/utils';

function MainBlock() {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(getBurgerIngredients);
  const draggedElements = useSelector(getDraggedElements);

  const handleDrop = (element) => {
    dispatch({
      type: ADD_INGREDIENT,
      ingredient: { ...element, id: Math.random() },
      ingredients: burgerIngredients,
    });
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
