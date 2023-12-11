import { FC } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient } from '../../services/store/burgerConstructor/burgerConstructor';

import burgerConstructorInnerStyles from './BurgerConstructorInner.module.css';
import { IIngredientDragged } from '../../types/data';
import { useDispatch } from '../../services/store/store';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface Props {
  item: IIngredientDragged;
  id: string;
  moveCard: any;
  findCard: any;
}

const BurgerConstructorInner: FC<Props> = ({ item, id, moveCard, findCard }) => {
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'burgerConstructorElement',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>(
    () => ({
      accept: 'burgerConstructorElement',
      hover({ id: draggedId }) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  const opacity = isDragging ? 0 : 1;

  const dispatch = useDispatch();

  const handleClose = (id: string) => {
    dispatch(removeIngredient(id));
  };

  return (
    <div
      className={burgerConstructorInnerStyles.ingredientWrapper}
      key={item.id}
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
      data-cy='dropped-el'
    >
      <DragIcon type='primary' />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        key={item.id}
        extraClass='ml-2'
        handleClose={() => handleClose(item.id)}
      />
    </div>
  );
};

export default BurgerConstructorInner;
