import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../../routes';
import { IOrderDetailsStore } from '../../../types/data';
import { request } from '../../utils';

export const createOrder = createAsyncThunk('orderDetails/createOrder', (ingredients: string[]) => {
  const payload = {
    ingredients: ingredients,
  };

  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(payload),
  }).then((data) => data);
});

const initialState: IOrderDetailsStore = {
  loadingStatus: 'idle',
  error: null,
  orderDetails: {
    name: '',
    order: {
      number: '',
    },
  },
};

export const createOrderSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(createOrder.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
        state.orderDetails = {
          name: '',
          order: {
            number: '',
          },
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(createOrder.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.orderDetails = action.payload;
        state.loadingStatus = 'resolved';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(createOrder.rejected, (state, action) => {
        state.loadingStatus = 'rejected';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
        state.orderDetails = {
          name: '',
          order: {
            number: '',
          },
        };
      });
  },
});
