import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { REMOVE_INGREDIENT } from '../../services/actions/burgerConstructor';
import burgerConstructorInnerStyles from './burgerConstructorInner.module.css';

function BurgerConstructorInner({ item, id, moveCard, findCard }) {
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

  const [, drop] = useDrop(
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

  const handleClose = (id) => {
    dispatch({ type: REMOVE_INGREDIENT, id: id });
  };

  return (
    <div
      className={burgerConstructorInnerStyles.ingredientWrapper}
      key={item.id}
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
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
}

export default BurgerConstructorInner;
