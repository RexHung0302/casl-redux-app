import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { createWrapper } from "next-redux-wrapper";

const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV !== 'production' });