import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  draggedIngredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state = initialState, action) => {
      if (action.payload.ingredient.type === 'bun') {
        state.draggedIngredients = [
          ...state.draggedIngredients.filter((item) => item.type !== 'bun'),
          action.payload.ingredient,
        ];
      } else {
        state.draggedIngredients = [...state.draggedIngredients, action.payload.ingredient]
      }
    },
    removeIngredient: (state = initialState, action) => {
      state.draggedIngredients = [...state.draggedIngredients.filter((item) => item.id !== action.payload)]
    },
  },
});

export const { addIngredient, removeIngredient } = burgerConstructorSlice.actions;
