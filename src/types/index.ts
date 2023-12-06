import { ThunkDispatch } from 'redux-thunk';
import { store } from '../services/store/store';
type TApplicationActions = any;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
