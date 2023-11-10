import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './burgerIngredients';
import { burgerConstructorSlice } from './burgerConstructor';
import { createOrderSlice } from './orderDetails';
import { registerUserSlice } from './auth';
import { userSlice } from './user';
import { currentIngredientSlice } from './currentIngredient';
import { resetPasswordSlice, setNewPasswordSlice } from './resetPassword';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  createOrder: createOrderSlice.reducer,
  registerUser: registerUserSlice.reducer,
  user: userSlice.reducer,
  currentIngredient: currentIngredientSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  setNewPassword: setNewPasswordSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
