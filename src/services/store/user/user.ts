import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../../../routes';
import { ILoginUser, IUser, IUserStore } from '../../../types/data';
import { checkResponse, request } from '../../utils';

export const refreshToken = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    return await checkResponse(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);

      let authToken = refreshData.accessToken;
      authToken = authToken.split('Bearer ')[1];
      if (authToken) {
        // Сохраняем токен в куку token
        localStorage.setItem('accessToken', authToken);
      }

      options.headers.Authorization = 'Bearer ' + authToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const getUserRequest = () =>
  fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });

export const getUser = createAsyncThunk('user/getUser', async () => {
  return await getUserRequest();
});

export const updateUserData = createAsyncThunk('user/updateUser', (user: IUser) => {
  return request(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(user),
  }).then((data) => data);
});

export const loginUser = createAsyncThunk('loginUser', (user: ILoginUser) => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  return request(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(payload),
  }).then((data) => data);
});

export const logoutUser = createAsyncThunk('logoutUser', () => {
  const token = localStorage.getItem('refreshToken');
  return request(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token: token }),
  }).then((data) => data);
});

const initialState: IUserStore = {
  loadingStatus: 'idle',
  error: null,
  user: {
    email: '',
    name: '',
    password: '',
  },
};

export const userSlice = createSlice({
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
          password: '',
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(getUser.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.loadingStatus = 'resolved';
        state.error = null;
        state.user = action.payload.user;
      })
      // Вызывается в случае ошибки
      .addCase(getUser.rejected, (state, action) => {
        state.loadingStatus = 'jwt expired';
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
          password: '',
        };
      })
      .addCase(updateUserData.pending, (state) => {
        state.loadingStatus = 'patchingIsLoading';
        state.error = null;
        state.user = {
          email: '',
          name: '',
          password: '',
        };
      })
      // Вызывается в том случае если запрос успешно выполнился
      .addCase(updateUserData.fulfilled, (state, action) => {
        // Добавляем пользователя
        state.loadingStatus = 'resolved';
        state.error = null;
        state.user = action.payload.user;
      })
      // Вызывается в случае ошибки
      .addCase(updateUserData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
          password: '',
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          let authToken = action.payload.accessToken;
          authToken = authToken.split('Bearer ')[1];
          if (authToken) {
            // Сохраняем токен в куку token
            localStorage.setItem('accessToken', authToken);
          }
          // Добавляем пользователя

          localStorage.setItem('refreshToken', action.payload.refreshToken);
          state.user = action.payload.user;
          state.loadingStatus = 'success';
          state.error = null;
        }
      })
      // Вызывается в случае ошибки
      .addCase(loginUser.rejected, (state, action) => {
        console.log('error');
        state.loadingStatus = 'failed';
        state.error = action.error;
        state.user = {
          email: '',
          name: '',
          password: '',
        };
      });
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = {
          email: '',
          name: '',
          password: '',
        };

        state.loadingStatus = 'userLoggedOut';
        state.error = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error;
        state.loadingStatus = 'failed';
      });
  },
});
