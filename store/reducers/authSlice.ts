import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@/store";
import { HYDRATE } from "next-redux-wrapper";
import { AnyMongoAbility, defineAbility } from "@casl/ability";

// Type for our state
export interface AuthState {
  authState: boolean;
  ability: AnyMongoAbility;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  ability: defineAbility((can) => {
    // 基本權限
    // can(['C', 'R', 'U', 'D'], 'Home');
  }),
};

interface IUser {
  id: number;
  account: string;
}

interface IPermission {
  action: Array<"C" | "R" | "U" | "D">;
  subject: string;
  fields?: Array<string>;
  conditions?: {}
}

interface IDefineAbilitiesFor {
  user: IUser;
  permissions: IPermission[];
}

const defineAbilitiesFor = ({user, permissions}: IDefineAbilitiesFor) => {
  return defineAbility((can) => {
    permissions.map((permission) => {
      can(permission.action, permission.subject, permission.fields || undefined, permission.conditions && user);
    });
  });
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
      const permission = action.payload;

      // pass userInfo and get New Ability
      const newAbility = defineAbilitiesFor({
        user: {
          id: 2,
          account: "admin",
        },
        permissions: permission
      });

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
    });
  },
});

export const { setAuthState, setAbility, setClearAbility } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectAbility = (state: AppState) => state.auth.ability;

export default authSlice.reducer;