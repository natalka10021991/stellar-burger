import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './reducers/burgerIngredients';
import { burgerConstructorReducer } from './reducers/burgerConstructor';
import { createOrderReducer } from './reducers/orderDetails';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  createOrder: createOrderReducer
})
