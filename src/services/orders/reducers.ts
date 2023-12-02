import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../types/orders';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage, wsConnectingHistory, wsOpenHistory, wsCloseHistory, wsErrorHistory, wsMessageHistory } from './actions';

interface IOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface IOrdersStore {
  success: boolean;
  orders: {
    orders: IOrder[];
    total: number;
    totalToday: number;
    success: boolean;
  };
  total: number;
  totalToday: number;
  status: WebsocketStatus;
  error: string;
}

const initialState: IOrdersStore = {
  success: false,
  orders: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.OFFLINE,
  error: '',
};

export const OrdersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.error = 'error';
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload;
    });
});

const initialHistoryState: IOrdersStore = {
  success: false,
  orders: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.OFFLINE,
  error: '',
};

export const HistoryReducer = createReducer(initialHistoryState, (builder) => {
  builder
    .addCase(wsConnectingHistory, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpenHistory, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = '';
    })
    .addCase(wsCloseHistory, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorHistory, (state, action) => {
      state.error = action.payload;
    })
    .addCase(wsMessageHistory, (state, action) => {
      state.orders = action.payload;
    });
});

