import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { RootState, rootReducers } from "../../services/store";
import socketMiddleware from "../../middlewares/socketMiddleware";
import { Socket } from "socket.io-client";
import MockedSocket from "socket.io-mock";

jest.mock("socket.io-client");

// Importez les actions nécessaires pour effectuer des assertions sur le store
import { joinRoom } from "../../services/slices/gameSlice";

// Mock du serveur Socket.io pour les tests
let socket = new MockedSocket();

// Créez une fonction utilitaire pour créer le store avec le middleware Socket.io
const createTestStore = (initialState: RootState, socket: Socket) => {
  const middleware = applyMiddleware(socketMiddleware(socket));
  return createStore(rootReducers, initialState, middleware);
};

describe("SocketClient", () => {
  beforeEach(() => {
    socket = new MockedSocket();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Grid should be initialized correctly", async () => {
    // Grille simulée de l'événement "gameInitialization" provenant du serveur Socket.io
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

    // Connecter le socket simulé au middleware de socket
    const store = createTestStore(initialState, socket);

    // Capturez les actions dispatchées par le middleware Socket.io
    store.dispatch(joinRoom("abc"));

    // Vérifiez que le store est mis à jour avec la valeur attendue
    expect(store.getState().game.room.name).toEqual("abc");

    // Attendre que l'événement "gameInitialization" soit traité

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

    // Dispatchez une action de simulation de l'événement "gameInitialization" provenant du serveur Socket.io
    socket.socketClient.emit(
      "gameInitialization",
      gameInitializationTestData.socketId,
      gameInitializationTestData.grid,
      gameInitializationTestData.currentPlayer
    );
  });
});
