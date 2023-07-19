import { Dispatch } from "redux";
import { RootState } from "../services/store";

interface SocketMiddlewareParams {
  dispatch: Dispatch;
  getState: () => RootState;
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      // Connect to the socket when a user logs in
      // case "user/login": {
      //   socket.connect();
      //   break;
      // }

      case "game/socketConnection": {
        socket.connect();
        break;
      }

      // Disconnect from the socket when a user logs out
      case "user/logout": {
        socket.disconnect();
        break;
      }

      // Join the room when a user navigates to the game page
      case "game/joinRoom": {
        /** 
            @todo Supprimer la connection lorsque que le système de login sera en place
        **/

        socket.on(
          "gameInitialization",
          (socketId: string, grid: string[][], currentPlayer: string) => {
            dispatch({
              type: "game/gameInitialization",
              payload: {
                socketId,
                grid,
                currentPlayer,
              },
            });
          }
        );

        socket.emit("joinRoom", payload);

        socket.on("roomFull", (roomName: string) => {
          dispatch({ type: "game/roomFull", payload: roomName });
          dispatch({ type: "game/setError", payload }); // Dispatchez l'erreur
          socket.disconnect();
        });

        // Listen for the player's symbol
        socket.on("playerSymbol", (symbol: string) => {
          dispatch({ type: "game/setPlayerSymbol", payload: symbol });
        });

        // Listen for the updated grid
        socket.on("gridUpdated", (grid: string[][], currentPlayer: string) => {
          dispatch({
            type: "game/getUpdateGrid",
            payload: { updatedGrid: grid, currentPlayer },
          });
        });

        // Listen for the game over event
        socket.on(
          "gameOver",
          (
            grid: string[][],
            currentPlayer: string,
            winningPlayer: number,
            winningCells: number[][]
          ) => {
            dispatch({
              type: "game/getUpdateGrid",
              payload: { updatedGrid: grid, currentPlayer },
            });
            dispatch({ type: "game/setWinningPlayer", payload: winningPlayer });
            dispatch({ type: "game/setWinningCells", payload: winningCells });
          }
        );

        break;
      }

      case "game/setUpdateGrid": {
        // Update the grid when a user makes a move
        socket.emit(
          "setUpdateGrid",
          payload.currentPlayer,
          payload.updatedGrid
        );

        break;
      }
    }

    return next(action);
  };
}
