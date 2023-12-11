import { createSlice } from '@reduxjs/toolkit';
import { IBurgerConstructorStore } from '../../../types/data';

const initialState: IBurgerConstructorStore = {
  draggedIngredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    replaceIngredient: (state = initialState, action) => {
      state.draggedIngredients = [
        ...state.draggedIngredients.filter((item) => item.type !== 'bun'),
        action.payload.ingredient,
      ];
    },
    addIngredient: (state = initialState, action) => {
      state.draggedIngredients = [...state.draggedIngredients, action.payload.ingredient];
    },
    removeIngredient: (state = initialState, action) => {
      state.draggedIngredients = [
        ...state.draggedIngredients.filter((item) => item.id !== action.payload),
      ];
    },
  },
});

export const { addIngredient, replaceIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
