import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../routes';
import { setCookie, checkResponse } from '../utils';

export const loginUser = createAsyncThunk('loginUser', (user) => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(payload),
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
});

export const updateUser = createAsyncThunk('updateUser', (token) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: token,
    },
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
});

export const logoutUser = createAsyncThunk('logoutUser', (token) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: token }),
  })
    .then((res) => checkResponse(res))
    .then((data) => data)
    .catch((e) => console.log(e, 'error'));
});

const initialState = {
  loadingStatus: 'idle',
  error: null,
  isAuthenticated: false,
  user: {
    email: '',
    name: '',
  },
};

export const loginUserSlice = createSlice({
  name: 'user/login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(loginUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
        state.isAuthenticated = false;
        state.user = {
          email: '',
          name: '',
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Добавляем пользователя
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          state.user = action.payload.user;
          state.loadingStatus = 'success';
          state.isAuthenticated = true;
          state.error = null;
        }
      })
      // Вызывается в случае ошибки
      .addCase(loginUser.rejected, (state, action) => {
        console.log('error');
        state.loadingStatus = 'failed';
        state.isAuthenticated = false;
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
        };
      });
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Добавляем пользователя
          state.user = {
            email: '',
            name: '',
          };
          state.isAuthenticated = false;

          state.loadingStatus = 'success';
          state.error = null;
          localStorage.setItem('accessToken', null);
          localStorage.setItem('refreshToken', null);
        }
      })
      // // Вызывается в случае ошибки
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          // Добавляем пользователя
          state.user = action.payload.user;
          state.loadingStatus = 'success';
          state.isAuthenticated = true;
          state.error = null;
        }
      })
      // // Вызывается в случае ошибки
      .addCase(updateUser.rejected, (state, action) => {
        console.log('error');
        state.loadingStatus = 'failed';
        state.isAuthenticated = false;
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
        };
      });
  },
});
