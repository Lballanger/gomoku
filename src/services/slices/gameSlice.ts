/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  GameState,
  UpdateGridPayload,
  UserInRoom,
  RoomsState,
  GameList,
  Message,
} from "../../utilities/types";

const initialState: GameState = {
  socketId: null,
  rooms: null,
  room: {
    name: null,
    users: null,
    gameList: null,
    grid: null,
    playerSymbol: null,
    currentPlayer: null,
    winningPlayer: null,
    winningCells: [],
    playerToInvite: null,
    receivedInvitation: null,
    gameId: null,
    roomMessage: [],
    gameMessage: [],
  },
  socketConnected: false,
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

    socketConnected(state, action: PayloadAction<string>) {
      return {
        ...state,
        socketId: action.payload,
        socketConnected: true,
      };
    },

    roomInformation(state, action: PayloadAction<RoomsState[]>) {
      return {
        ...state,
        rooms: action.payload,
      };
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

    gameList: (state, action: PayloadAction<GameList[]>) => {
      return {
        ...state,
        room: {
          ...state.room,
          gameList: action.payload,
        },
      };
    },

    userJoined(state, action: PayloadAction<UserInRoom[]>) {
      return {
        ...state,
        room: {
          ...state.room,
          users: action.payload,
        },
      };
    },

    userLeft(state, action: PayloadAction<UserInRoom[]>) {
      return {
        ...state,
        room: {
          ...state.room,
          users: action.payload,
        },
      };
    },

    sendInvite(state, action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          playerToInvite: action.payload,
        },
      };
    },

    receivedInvite(state, action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          receivedInvitation: action.payload,
        },
      };
    },

    acceptInvite(state, _action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          receivedInvitation: null,
        },
      };
    },

    declineInvite(state, _action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          receivedInvitation: null,
        },
      };
    },

    declinedInvite(state, _action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          playerToInvite: null,
        },
      };
    },

    leaveRoom(state, _action: PayloadAction<string>) {
      return {
        ...state,
        room: {
          ...state.room,
          name: null,
          users: null,
          grid: null,
          playerSymbol: null,
          currentPlayer: null,
          winningPlayer: null,
          winningCells: [],
          playerToInvite: null,
          receivedInvitation: null,
          gameId: null,
        },
      };
    },

    leaveGameRoom(state, _action) {
      return {
        ...state,
        room: {
          ...state.room,
          grid: null,
          playerSymbol: null,
          currentPlayer: null,
          winningPlayer: null,
          winningCells: [],
          playerToInvite: null,
          receivedInvitation: null,
          gameId: null,
        },
      };
    },

    updatePlayers(state, action: PayloadAction<UserInRoom[]>) {
      return {
        ...state,
        room: {
          ...state.room,
          users: action.payload,
        },
      };
    },

    gameInitialization(
      state,
      action: PayloadAction<{
        socketId: string;
        grid: string[][];
        currentPlayer: string;
        gameId: string;
      }>
    ) {
      return {
        ...state,
        socketId: action.payload.socketId,
        room: {
          ...state.room,
          grid: action.payload.grid,
          currentPlayer: action.payload.currentPlayer,
          gameId: action.payload.gameId,
        },
      };
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
        room: {
          ...state.room,
          grid: null,
          playerSymbol: null,
          currentPlayer: null,
          winningPlayer: null,
          winningCells: [],
          playerToInvite: null,
          receivedInvitation: null,
          gameId: null,
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

    setError(state, action: PayloadAction<string | null>) {
      return {
        ...state,
        error: action.payload,
      };
    },

    receivedMessageInRoom(state, action: PayloadAction<Message[]>) {
      return {
        ...state,
        room: {
          ...state.room,
          roomMessage: action.payload,
        },
      };
    },

    sentMessageInRoom(state, action: PayloadAction<Message>) {
      return {
        ...state,
        room: {
          ...state.room,
          roomMessage: [...state.room.roomMessage, action.payload],
        },
      };
    },

    receivedMessageInGame(state, action: PayloadAction<Message[]>) {
      return {
        ...state,
        room: {
          ...state.room,
          gameMessage: action.payload,
        },
      };
    },

    sentMessageInGame(state, action: PayloadAction<Message>) {
      return {
        ...state,
        room: {
          ...state.room,
          gameMessage: [...state.room.gameMessage, action.payload],
        },
      };
    },
  },
});

export const {
  socketConnection,
  gameInitialization,
  joinRoom,
  leaveRoom,
  leaveGameRoom,
  roomFull,
  sendInvite,
  acceptInvite,
  declineInvite,
  setUpdateGrid,
  setPlayerSymbol,
  setWinningPlayer,
  setWinningCells,
  resetBoard,
  resetRoom,
  reset,
  sentMessageInRoom,
  sentMessageInGame,
  setError,
} = GameSlice.actions;
