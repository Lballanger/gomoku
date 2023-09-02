/* eslint-disable @typescript-eslint/no-explicit-any */
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
          (
            socketId: string,
            grid: string[][],
            currentPlayer: string,
            gameId: string
          ) => {
            dispatch({
              type: "game/gameInitialization",
              payload: {
                socketId,
                grid,
                currentPlayer,
                gameId,
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

        socket.on("userJoined", (players: string[][]) => {
          dispatch({ type: "game/userJoined", payload: players });
        });

        socket.on("receivedInvite", (playerToInvite: string) => {
          dispatch({
            type: "game/receivedInvite",
            payload: playerToInvite,
          });
        });

        socket.on("updatePlayers", (players: string[][]) => {
          dispatch({ type: "game/updatePlayers", payload: players });
        });

        // Listen for the player's symbol
        socket.on("playerSymbol", (symbol: string) => {
          dispatch({ type: "game/setPlayerSymbol", payload: symbol });
        });

        // Listen for the updated grid
        socket.on("gridUpdated", (grid: string[][], currentPlayer: string) => {
          console.log("gridUpdated event");

          dispatch({
            type: "game/getUpdateGrid",
            payload: { updatedGrid: grid, currentPlayer },
          });
        });

        socket.on("userLeft", (players: string[][]) => {
          dispatch({ type: "game/userLeft", payload: players });
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

      // Send an invitation to a user
      case "game/sendInvite": {
        socket.emit("sendInvite", payload);
        break;
      }

      case "game/acceptInvite": {
        socket.emit("acceptInvite", payload);
        break;
      }

      // Leave the room when a user navigates away from the game page
      case "game/leaveRoom": {
        socket.emit("leaveRoom", payload);
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
