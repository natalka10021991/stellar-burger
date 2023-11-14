import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './burgerIngredients';
import { createOrderSlice } from './orderDetails';
import { registerUserSlice } from './auth';
import { userSlice } from './user';
import { currentIngredientSlice } from './currentIngredient';
import { resetPasswordSlice, setNewPasswordSlice } from './resetPassword';
import { burgerConstructorSlice } from './burgerConstructor';

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

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
