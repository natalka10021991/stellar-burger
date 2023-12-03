import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getBurgerIngredients, getDraggedElements } from '../../services/utils';
import { addIngredient } from '../../services/store/burgerConstructor';

import mainBlockStyles from './MainBlock.module.css';
import { IIngredient } from '../../types/data';
import { useDispatch, useSelector } from '../../services/store/store';

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
