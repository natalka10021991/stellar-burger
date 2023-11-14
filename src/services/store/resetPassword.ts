import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../routes';
import { IResetPasswordStore } from '../../utils/types';
import { request } from '../utils';

export const resetPassword = createAsyncThunk('resetPassword', (value: string) => {
  return request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: value,
    }),
  })
  .then(data => data.data)
});

const initialStateResetPassword: IResetPasswordStore = {
  loadingStatus: 'idle',
  error: null,
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: initialStateResetPassword,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(resetPassword.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(resetPassword.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.loadingStatus = 'success';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(resetPassword.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
      });
  },
});

export const setNewPassword = createAsyncThunk('setNewPassword', (values: {password: string, token: string}) => {
  return request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      password: values.password,
      token: values.token,
    }),
  })
  .then(data => data)
});

const initialStateSetNewPassword: IResetPasswordStore = {
  loadingStatus: 'idle',
  error: null,
};

export const setNewPasswordSlice = createSlice({
  name: 'setNewPassword',
  initialState: initialStateSetNewPassword,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(setNewPassword.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(setNewPassword.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.loadingStatus = 'success';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
      });
  },
});
