import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './burgerIngredients';
import { burgerConstructorSlice } from './burgerConstructor';
import { createOrderSlice } from './orderDetails';
import { registerUserSlice } from './auth';
import { loginUserSlice } from './login';
import { getUserSlice, updateUserSlice } from './user';
import { currentIngredientSlice } from './currentIngredient';
import { resetPasswordSlice, setNewPasswordSlice } from './resetPassword';
import { updateTokenSlice } from './updateToken';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  createOrder: createOrderSlice.reducer,
  registerUser: registerUserSlice.reducer,
  loginUser: loginUserSlice.reducer,
  getUser: getUserSlice.reducer,
  updateUser: updateUserSlice.reducer,
  currentIngredient: currentIngredientSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  setNewPassword: setNewPasswordSlice.reducer,
  updateToken: updateTokenSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
});
