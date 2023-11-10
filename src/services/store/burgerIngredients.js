import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../routes';
import { request } from '../utils';

export const getBurgerIngredients = createAsyncThunk('burgerIngredients/getBurgerIngredients', () => {
  return request(`${BASE_URL}/ingredients`)
  .then(data => data.data)
});

const initialState = {
  burgerIngredients: [],
  loadingStatus: 'idle',
  error: null,
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(getBurgerIngredients.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(getBurgerIngredients.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.burgerIngredients = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(getBurgerIngredients.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
      });
  },
});
