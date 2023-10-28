import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { GET_USER } from '../../routes';
import { getCookie } from '../utils';

export const getUser = createAsyncThunk('user/getUser', () => {
  return fetch(GET_USER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getCookie('accessToken'),
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((e) => console.log(e));
});

const initialState = {
  loadingStatus: 'idle',
  error: null,
  user: {
    email: '',
    name: '',
    password: '',
  },
};

export const updateUser = createAsyncThunk('user/getUser', (user) => {
  return fetch(GET_USER, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => data);
});

export const getUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(getUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
        state.user = {
          email: '',
          name: '',
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Добавляем пользователя
          state.loadingStatus = 'idle';
          state.error = null;
          state.user = action.payload.user;
        } else if (action.payload.message === 'jwt expired') {
          state.loadingStatus = 'failed';
          state.error = 'jwt expired';
          state.user = {
            email: '',
            name: '',
          };
        }
      })
      // Вызывается в случае ошибки
      .addCase(getUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
        };
      });
  },
});

export const updateUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(getUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
        state.user = {
          email: '',
          name: '',
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(getUser.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.loadingStatus = 'idle';
        state.error = null;
        state.user = action.payload.user;
      })
      // Вызывается в случае ошибки
      .addCase(getUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
        };
      });
  },
});
