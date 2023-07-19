/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { GameState, UpdateGridPayload } from "../../utilities/types";

const initialState: GameState = {
  socketId: null,
  room: {
    name: null,
    users: null,
    grid: null,
    playerSymbol: null,
    currentPlayer: null,
    winningPlayer: null,
    winningCells: [],
  },
  status: "idle",
  error: null,
};

export const GameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    socketConnection(_state, _action: PayloadAction<string>) {
      return;
    },

    joinRoom(state, action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          name: action.payload,
        },
        status: "success",
      };
    },

    gameInitialization(
      state,
      action: PayloadAction<{
        socketId: string;
        grid: string[][];
        currentPlayer: string;
      }>
    ) {
      return {
        ...state,
        socketId: action.payload.socketId,
        room: {
          ...state.room,
          grid: action.payload.grid,
          currentPlayer: action.payload.currentPlayer,
        },
      };
    },

    roomFull: (state, action: PayloadAction<string>) => {
      state.room = {
        ...state.room,
        name: null,
        users: null,
        grid: null,
        playerSymbol: null,
        currentPlayer: null,
      };
      state.status = "error";
      state.error = action.payload;
    },

    setUpdateGrid(_state, _action: PayloadAction<UpdateGridPayload>) {
      return;
    },

    getUpdateGrid(state, action: PayloadAction<UpdateGridPayload>) {
      return {
        ...state,
        room: {
          ...state.room,
          grid: action.payload.updatedGrid,
          currentPlayer: action.payload.currentPlayer,
        },
      };
    },

    setPlayerSymbol(state, action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          playerSymbol: action.payload,
        },
      };
    },

    setWinningPlayer(state, action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          winningPlayer: action.payload,
        },
      };
    },

    setWinningCells(state, action: PayloadAction<string[][]>) {
      return {
        ...state,
        room: {
          ...state.room,
          winningCells: action.payload,
        },
      };
    },

    resetBoard(state, _action: PayloadAction<string>) {
      return {
        ...state,
        socketId: null,
        room: {
          name: null,
          users: null,
          grid: null,
          playerSymbol: null,
          currentPlayer: null,
          winningPlayer: null,
          winningCells: [],
        },
      };
    },

    resetRoom(state) {
      return {
        ...state,
        room: initialState.room,
      };
    },

    reset(state) {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const {
  socketConnection,
  gameInitialization,
  joinRoom,
  roomFull,
  setUpdateGrid,
  setPlayerSymbol,
  setWinningPlayer,
  setWinningCells,
  resetBoard,
  resetRoom,
  reset,
} = GameSlice.actions;
