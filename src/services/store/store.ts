import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsSlice } from './burgerIngredients/burgerIngredients';
import { createOrderSlice } from './orderDetails/orderDetails';
import { registerUserSlice } from './auth/auth';
import { userSlice } from './user/user';
import { resetPasswordSlice, setNewPasswordSlice } from './resetPassword/resetPassword';
import { burgerConstructorSlice } from './burgerConstructor/burgerConstructor';
import { HistoryReducer, OrdersReducer } from '../orders/reducers';
import { socketMiddleware } from '../middleware/socket-middleware';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as SelectorHook,
} from 'react-redux';

import {
  connect as OrdersWsConnect,
  disconnect as OrderWsDisconnect,
  wsConnecting as OrdersWsConnecting,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersMessage,
  wsError as OrdersWsError,
  connectHistory as HistoryWsConnect,
  disconnectHistory as HistoryWsDisconnect,
  wsConnectingHistory as HistoryWsConnecting,
  wsOpenHistory as HistoryWsOpen,
  wsCloseHistory as HistoryWsClose,
  wsMessageHistory as HistoryMessage,
  wsErrorHistory as HistoryWsError,
} from '../orders/actions';
import { getOrderSlice } from './order/order';

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = SelectorHook;

const wsActions = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrderWsDisconnect,
  wsConnecting: OrdersWsConnecting,
  onOpen: OrdersWsOpen,
  onClose: OrdersWsClose,
  onError: OrdersWsError,
  onMessage: OrdersMessage,
};

const wsHistoryActions = {
  wsConnect: HistoryWsConnect,
  wsDisconnect: HistoryWsDisconnect,
  wsConnecting: HistoryWsConnecting,
  onOpen: HistoryWsOpen,
  onClose: HistoryWsClose,
  onError: HistoryWsError,
  onMessage: HistoryMessage,
};

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  createOrder: createOrderSlice.reducer,
  registerUser: registerUserSlice.reducer,
  user: userSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  setNewPassword: setNewPasswordSlice.reducer,
  order: getOrderSlice.reducer,
  orders: OrdersReducer,
  history: HistoryReducer,
});

const ordersMiddleware = socketMiddleware(wsActions);

const historyOrdersMiddleware = socketMiddleware(wsHistoryActions);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersMiddleware, historyOrdersMiddleware),
});
