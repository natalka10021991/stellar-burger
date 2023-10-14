import {
  GET_BURGER_INGREDIENTS,
  GET_BURGER_INGREDIENTS_FAILED,
  GET_BURGER_INGREDIENTS_SUCCESS,
} from '../actions/burgerIngredients';

const initialState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS: {
      return {
        ...state,
        burgerIngredientsRequest: true
      }
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        burgerIngredients: [],
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: true
      }
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: false,
        burgerIngredients: action.burgerIngredients
      }
    }
    default: {
      return state
    }
  }
}
