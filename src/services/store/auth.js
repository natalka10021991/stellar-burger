import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REGISTER_URL } from '../../routes';
import { setCookie } from '../utils';

export const registerUser = createAsyncThunk('registerUser', (user) => {
  const payload = {
    email: user.email,
    password: user.password,
    name: user.name,
  };
  return fetch(REGISTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch((e) => console.log(e));
});

const initialState = {
  loadingStatus: 'idle',
  error: null,
  isAuthenticated: false,
  user: {
    email: '',
    name: '',
  },
  accessToken: '',
  refreshToken: '',
};

export const registerUserSlice = createSlice({
  name: 'user/register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Вызывается прямо перед выполнением запроса
      .addCase(registerUser.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
        state.isAuthenticated = false;
        state.user = {
          email: '',
          name: '',
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(registerUser.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.loadingStatus = 'success';
        state.isAuthenticated = true;
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(registerUser.rejected, (state, action) => {
        console.log('error');
        state.loadingStatus = 'failed';
        state.isAuthenticated = false;
        // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
        };
      });
  },
});
