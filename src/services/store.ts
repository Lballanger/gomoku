import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AuthSlice } from "./slices/authSlice";
import { GameSlice } from "./slices/gameSlice";

import SocketClient from "../socket/SocketClient";
import socketMiddleware from "../middlewares/socketMiddleware";

const socket = new SocketClient();

export const rootReducers = combineReducers({
  auth: AuthSlice.reducer,
  game: GameSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(socket)),
});

export default store;
