import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { createWrapper } from "next-redux-wrapper";

const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

const store = () =>
  configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(store);