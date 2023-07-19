import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { AuthState, User } from "../../utilities/types";

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
    login(state) {
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
