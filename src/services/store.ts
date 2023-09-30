import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AuthSlice } from "./slices/authSlice";
import { GameSlice } from "./slices/gameSlice";

import SocketClient from "../socket/SocketClient";
import socketMiddleware from "../middlewares/socketMiddleware";
import chatSocketMiddleware from "../middlewares/chatSocketMiddleware";

const socket = new SocketClient();

export const rootReducers = combineReducers({
  auth: AuthSlice.reducer,
  game: GameSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducers>;

const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketMiddleware(socket))
      .concat(chatSocketMiddleware(socket)),
});

export default store;
