import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../routes';
import { checkResponse } from '../utils';

export const updateToken = createAsyncThunk('resetPassword', (token) => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: token }),
  })
    .then(checkResponse)
    .then((data) => {
      return data.data;
    });
});

const initialState = {
  loadingStatus: 'idle',
  error: null,
};

export const updateTokenSlice = createSlice({
  name: 'updateToken',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(updateToken.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(updateToken.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.loadingStatus = 'success';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(updateToken.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
      });
  },
});
