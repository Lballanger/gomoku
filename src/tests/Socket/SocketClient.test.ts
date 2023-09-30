import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { RootState, rootReducers } from "../../services/store";
import socketMiddleware from "../../middlewares/socketMiddleware";
import { Socket } from "socket.io-client";
import MockedSocket from "socket.io-mock";

jest.mock("socket.io-client");

// Import the actions needed to perform assertions on the store
import { joinRoom } from "../../services/slices/gameSlice";

// Socket.io server mock for tests
let socket = new MockedSocket();

// Create a utility function to create the store with the Socket.io middleware
const createTestStore = (initialState: RootState, socket: Socket) => {
  const middleware = applyMiddleware(socketMiddleware(socket));
  return createStore(rootReducers, initialState, middleware);
};

// Simulated grid of the "gameInitialization" event from the Socket.io server
const gameInitializationTestData = {
  socketId: "123",
  grid: [
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", ""],
  ],
  currentPlayer: "X",
};

// Define the `initialState` variable explicitly with RootState type
const initialState: RootState = {
  auth: {
    isAuthenticated: false,
    user: null,
    token: null,
    status: "idle",
  },
  game: {
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
  },
};

describe("Socket.io client middleware", () => {
  beforeEach(() => {
    socket = new MockedSocket();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Test the gameInitialization event : game/joinRoom - game/gameInitialization - socketId - grid - currentPlayer", async () => {
    // Connect the simulated socket to the socket middleware
    const store = createTestStore(initialState, socket);
    // Capture actions dispatched by Socket.io middleware
    store.dispatch(joinRoom("abc"));

    // Check that the blind is updated with the expected value
    expect(store.getState().game.room.name).toEqual("abc");

    socket.on(
      "gameInitialization",
      (socketId: string, grid: string[][], currentPlayer: string) => {
        expect(socketId).toEqual(gameInitializationTestData.socketId);
        expect(grid).toEqual(gameInitializationTestData.grid);
        expect(currentPlayer).toEqual(gameInitializationTestData.currentPlayer);
        expect(store.getState().game.room.grid).toEqual(
          gameInitializationTestData.grid
        );
        expect(store.getState().game.room.currentPlayer).toEqual(
          gameInitializationTestData.currentPlayer
        );
      }
    );

    // Emit a simulation action for the "gameInitialization" event
    socket.socketClient.emit(
      "gameInitialization",
      gameInitializationTestData.socketId,
      gameInitializationTestData.grid,
      gameInitializationTestData.currentPlayer
    );
  });

  test("Test the roomFull event : game/roomFull - roomName", async () => {
    // Create a mocked function for socket.disconnect()
    const mockDisconnect = jest.fn();
    // Replace the original function with the mocked one
    socket.disconnect = mockDisconnect;
    // Connect the simulated socket to the socket middleware
    const store = createTestStore(initialState, socket);
    // Simulated grid of the "gameInitialization" event from the Socket.io server
    const roomFullTestData = {
      roomName: "abc",
    };

    // Capture actions dispatched by Socket.io middleware
    store.dispatch(joinRoom("abc"));

    // Check that the blind is updated with the expected value
    expect(store.getState().game.room.name).toEqual("abc");

    socket.on("roomFull", (roomName: string) => {
      expect(roomName).toEqual(roomFullTestData.roomName);
      expect(store.getState().game.error).toEqual(roomFullTestData.roomName);
    });

    // Dispatch a simulation action for the "gameInitialization" event
    socket.socketClient.emit("roomFull", roomFullTestData.roomName);

    // Ensure that socket.disconnect() is called inside the "roomFull" event
    expect(mockDisconnect).toHaveBeenCalled();
  });

  test("Test the playerSymbol event : game/playerSymbol - symbol", async () => {
    // Connect the simulated socket to the socket middleware
    const store = createTestStore(initialState, socket);
    // Simulated grid of the "gameInitialization" event from the Socket.io server
    const playerSymbolTestData = {
      playerSymbol: "X",
    };

    // Capture actions dispatched by Socket.io middleware
    store.dispatch(joinRoom("abc"));

    // Check that the blind is updated with the expected value
    expect(store.getState().game.room.name).toEqual("abc");

    socket.on("playerSymbol", (playerSymbol: string) => {
      expect(playerSymbol).toEqual(playerSymbolTestData.playerSymbol);
      expect(store.getState().game.room.playerSymbol).toEqual(
        playerSymbolTestData.playerSymbol
      );
    });

    // Emit a simulation action for the "playerSymbol" event
    socket.socketClient.emit("playerSymbol", playerSymbolTestData.playerSymbol);
  });

  test("Test gridUpdated event : game/gridUpdated - grid - currentPlayer", async () => {
    // Connect the simulated socket to the socket middleware
    const store = createTestStore(initialState, socket);
    // Simulated grid of the "gameInitialization" event from the Socket.io server
    const gridgridUpdatedTestData = {
      grid: [
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "X", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      ],
      // Next player
      currentPlayer: "O",
    };

    // Capture actions dispatched by Socket.io middleware
    store.dispatch(joinRoom("abc"));

    // Check that the blind is updated with the expected value
    expect(store.getState().game.room.name).toEqual("abc");

    socket.on("gridUpdated", (grid: string[][], currentPlayer: string) => {
      expect(grid).toEqual(gridgridUpdatedTestData.grid);
      expect(currentPlayer).toEqual(gridgridUpdatedTestData.currentPlayer);
      expect(store.getState().game.room.grid).toEqual(
        gridgridUpdatedTestData.grid
      );
      expect(store.getState().game.room.currentPlayer).toEqual(
        gridgridUpdatedTestData.currentPlayer
      );
    });

    // Emit a simulation action for the "gridUpdate" event
    socket.socketClient.emit(
      "gridUpdated",
      gridgridUpdatedTestData.grid,
      gridgridUpdatedTestData.currentPlayer
    );
  });

  test("Test the gameOver event : game/gameOver - grid - currentPlayer - winningPlayer - winningCells", async () => {
    // Connect the simulated socket to the socket middleware
    const store = createTestStore(initialState, socket);
    // Simulated grid of the "gameInitialization" event from the Socket.io server
    const gameOverTestData = {
      grid: [
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "O", "X", "", "", "", "", "", ""],
        ["", "", "", "", "", "O", "X", "", "", "", "", "", ""],
        ["", "", "", "", "", "O", "X", "", "", "", "", "", ""],
        ["", "", "", "", "", "O", "X", "", "", "", "", "", ""],
        ["", "", "", "", "", "O", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      ],
      // Next player
      currentPlayer: "X",
      // Winning player
      winningPlayer: 1,
      // Winning cells
      winningCells: [],
    };

    // Capture actions dispatched by Socket.io middleware
    store.dispatch(joinRoom("abc"));

    // Check that the blind is updated with the expected value
    expect(store.getState().game.room.name).toEqual("abc");

    socket.on(
      "gameOver",
      (
        grid: string[][],
        currentPlayer: string,
        winningPlayer: number,
        winningCells: number[][]
      ) => {
        expect(grid).toEqual(gameOverTestData.grid);
        expect(currentPlayer).toEqual(gameOverTestData.currentPlayer);
        expect(winningPlayer).toEqual(gameOverTestData.winningPlayer);
        expect(winningCells).toEqual(gameOverTestData.winningCells);
        expect(store.getState().game.room.grid).toEqual(gameOverTestData.grid);
        expect(store.getState().game.room.currentPlayer).toEqual(
          gameOverTestData.currentPlayer
        );
        expect(store.getState().game.room.winningPlayer).toEqual(
          gameOverTestData.winningPlayer
        );
        expect(store.getState().game.room.winningCells).toEqual(
          gameOverTestData.winningCells
        );
      }
    );

    // Emit a simulation action for the "gameOver" event
    socket.socketClient.emit(
      "gameOver",
      gameOverTestData.grid,
      gameOverTestData.currentPlayer,
      gameOverTestData.winningPlayer,
      gameOverTestData.winningCells
    );
  });
});
