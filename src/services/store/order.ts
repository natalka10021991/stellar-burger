import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../routes';
import { IOrderStore } from '../../types/data';
import { request } from '../utils';

export const getOrder = createAsyncThunk('order/getOrder', (id: string | number) => {
  return request(`${BASE_URL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  }).then((data) => data);
});

const initialState: IOrderStore = {
  loadingStatus: 'idle',
  error: null,
  order: {
    ingredients: [''],
    _id: '',
    status: '',
    number: 0,
    name: '',
    price: '',
    createdAt: '',
    updatedAt: '',
  },
};

export const getOrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(getOrder.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
        state.order = {
          ingredients: [''],
          _id: '',
          status: '',
          number: 0,
          name: '',
          price: '',
          createdAt: '',
          updatedAt: '',
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(getOrder.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.order = action.payload.orders[0];
        state.loadingStatus = 'idle';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(getOrder.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
        state.order = {
          ingredients: [''],
          _id: '',
          status: '',
          number: 0,
          name: '',
          price: '',
          createdAt: '',
          updatedAt: '',
        };
      });
  },
});
