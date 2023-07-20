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

    // Dispatch a simulation action for the "gameInitialization" event
    socket.socketClient.emit(
      "gameInitialization",
      gameInitializationTestData.socketId,
      gameInitializationTestData.grid,
      gameInitializationTestData.currentPlayer
    );
  });

  test("Test the roomFull event : game/roomFull - game/setError - disconnect", async () => {
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
    console.log(store.getState());

    socket.on("roomFull", (roomName: string) => {
      expect(roomName).toEqual(roomFullTestData.roomName);
      expect(store.getState().game.error).toEqual(roomFullTestData.roomName);
    });

    // Dispatch a simulation action for the "gameInitialization" event
    socket.socketClient.emit("roomFull", roomFullTestData.roomName);

    // Ensure that socket.disconnect() is called inside the "roomFull" event
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
