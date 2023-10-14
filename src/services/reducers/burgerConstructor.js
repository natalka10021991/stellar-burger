import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/burgerConstructor';

const initialState = {
  draggedIngredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          draggedIngredients: [
            ...state.draggedIngredients.filter((item) => item.type !== 'bun'),
            action.ingredient,
          ],
        };
      }
     
      return {
        ...state,
        draggedIngredients: [...state.draggedIngredients, action.ingredient],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        draggedIngredients: [...state.draggedIngredients.filter((item) => item.id !== action.id)],
      };
    }

    default: {
      return state;
    }
  }
};
