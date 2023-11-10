import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentIngredient: {},
};

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient: (state = initialState, action) => {
      state.currentIngredient = action.payload.element;
    },
  },
});

export const { setCurrentIngredient } = currentIngredientSlice.actions;
