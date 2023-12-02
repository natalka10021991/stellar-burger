import { createAction } from '@reduxjs/toolkit';
export const connect = createAction<string, 'ORDERS_CONNECT'>('ORDERS_CONNECT');

export const disconnect = createAction('ORDERS_DISCONNECT');
export const wsConnecting = createAction('ORDERS_WS_CONNECTING');

export const wsOpen = createAction('ORDERS_WS_OPEN');
export const wsClose = createAction('ORDERS_WS_CLOSE');
export const wsMessage = createAction<any, 'ORDERS_WS_MESSAGE'>('ORDERS_WS_MESSAGE');

export const wsError = createAction<string, 'ORDERS_WS_ERROR'>('ORDERS_WS_ERROR');

export type TOrdersActions =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsMessage>
  | ReturnType<typeof wsError>;



  export const connectHistory = createAction<string, 'HISTORY_CONNECT'>('HISTORY_CONNECT');

  export const disconnectHistory = createAction('HISTORY_DISCONNECT');
  export const wsConnectingHistory = createAction('HISTORY_WS_CONNECTING');
  
  export const wsOpenHistory = createAction('HISTORY_WS_OPEN');
  export const wsCloseHistory = createAction('HISTORY_WS_CLOSE');
  export const wsMessageHistory = createAction<any, 'HISTORY_WS_MESSAGE'>('HISTORY_WS_MESSAGE');
  
  export const wsErrorHistory = createAction<string, 'HISTORY_WS_ERROR'>('HISTORY_WS_ERROR');
  
  export type TOHistoryActions =
    | ReturnType<typeof connectHistory>
    | ReturnType<typeof disconnectHistory>
    | ReturnType<typeof wsOpenHistory>
    | ReturnType<typeof wsCloseHistory>
    | ReturnType<typeof wsMessageHistory>
    | ReturnType<typeof wsErrorHistory>;
  
