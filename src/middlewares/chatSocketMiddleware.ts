/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "redux";
import { RootState } from "../services/store";

interface SocketMiddlewareParams {
  dispatch: Dispatch;
  getState: () => RootState;
}

export default function chatSocketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      case "game/joinRoom": {
        socket.on("receivedMessageInRoom", (messages: string[][]) => {
          dispatch({ type: "game/receivedMessageInRoom", payload: messages });
        });

        socket.on("receivedMessageInGame", (message: string[][]) => {
          dispatch({
            type: "game/receivedMessageInGame",
            payload: message,
          });
        });
        break;
      }

      case "game/sentMessageInRoom": {
        socket.emit("sentMessageInRoom", payload);
        break;
      }

      case "game/sentMessageInGame": {
        socket.emit("sentMessageInGame", payload);
        break;
      }
    }
    return next(action);
  };
}
