import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../routes';
import { checkResponse } from '../utils';
import { updateToken } from './updateToken';

export const getUser = createAsyncThunk('user/getUser', async() => {

  try {
    const res = await fetch(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await updateToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      // localStorage.setItem("accessToken", refreshData.accessToken);
      // options.headers.authorization = refreshData.accessToken;
      // const res = await fetch(url, options);
      // return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }

  // return fetch(`${BASE_URL}/auth/user`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8',
  //     Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
  //   },
  // })
  //   .then(checkResponse)
  //   .then((data) => {
  //     return data;
  //   });
});

const initialState = {
  loadingStatus: 'idle',
  error: null,
  user: {
    email: '',
    name: '',
    password: '',
  },
  isUser: false
};

export const updateUser = createAsyncThunk('user/getUser', (user) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: localStorage.getItem('refreshToken'),
    },
    body: JSON.stringify(user),
  })
    .then(checkResponse)
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
        state.isUser = false;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Добавляем пользователя
          state.loadingStatus = 'success';
          state.error = null;
          state.user = action.payload.user;
          state.isUser = true;
        }
      })
      // Вызывается в случае ошибки
      .addCase(getUser.rejected, (state, action) => {
        state.loadingStatus = 'jwt expired';
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
        };
        state.isUser = false;
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
        state.isUser = false;
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(getUser.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.loadingStatus = 'success';
        state.error = null;
        state.user = action.payload.user;
        state.isUser = true;
      })
      // Вызывается в случае ошибки
      .addCase(getUser.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
        };
        state.isUser = false;
      });
  },
});
