import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LOGIN_URL, LOGOUT_URL, GET_USER } from '../../routes';
import { getCookie, setCookie } from '../utils';

export const loginUser = createAsyncThunk('loginUser', (user) => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  return fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      return data;
    })
    .catch((e) => console.log(e));
});

export const updateUser = createAsyncThunk('updateUser', () => {
  return fetch(GET_USER, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: getCookie('accessToken'),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      return data;
    })
    .catch((e) => console.log(e));
});

export const logoutUser = createAsyncThunk('logoutUser', () => {
  return fetch(LOGOUT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: getCookie('refreshToken') }),
  })
    .then((res) => res.json())
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
          setCookie('accessToken', null);
          setCookie('refreshToken', null);
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
