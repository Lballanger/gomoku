import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export interface User {
  name: string;
  email: string;
  _id: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("token") || null,
  status: "idle",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUser(state) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token) as User;

        return {
          ...state,
          token,
          isAuthenticated: true,
          user,
          status: "success",
        };
      }
    },
    logoutUser(state) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        status: "success",
      };
    },
  },
});
