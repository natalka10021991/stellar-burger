import { createSlice } from '@reduxjs/toolkit';
import { IIngredient } from '../../types/data';

const initialState: IIngredient = {
  _id: '',
  name: '',
  type: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
};

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient: (state = initialState, action) => {
      state = action.payload.element;
    },
  },
});

export const { setCurrentIngredient } = currentIngredientSlice.actions;
