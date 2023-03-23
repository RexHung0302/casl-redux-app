import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/store";
import { HYDRATE } from "next-redux-wrapper";
import { AbilityBuilder, AnyMongoAbility, defineAbility } from '@casl/ability'

// Type for our state
export interface AuthState {
  authState: boolean;
  ability: AnyMongoAbility;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  ability: defineAbility((can) => {
    // // 基本權限
    can(['C', 'R', 'U', 'D'], 'Home');
  })
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setAbility(state, action) {
      const newAbility = state.ability;
      newAbility.update([
        ...action.payload,
        ...state.ability.rules
      ]);
      state.ability = newAbility;
    },
    setClearAbility(state) {
      state.ability = state.ability.update([]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload,
      };
    })
  },
});

export const { setAuthState, setAbility, setClearAbility } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectAbility = (state: AppState) => state.auth.ability;

export default authSlice.reducer;