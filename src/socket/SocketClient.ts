import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  // On
  roomFull: (roomName: string) => void;
  gridUpdated: (grid: string[][], currentPlayer: string) => void;
  playerSymbol: (symbol: string) => void;
  gameOver: (winningPlayer: number, winningCells: number[][]) => void;
}

interface ClientToServerEvents {
  // Emit
  joinRoom: (roomName: string) => void;
  updateGrid: (currentPlayer: string, grid: string[][]) => void;
}

type EventNames = keyof (ServerToClientEvents & ClientToServerEvents);
type EventData = ServerToClientEvents & ClientToServerEvents;

export default class SocketClient {
  private socket: Socket<EventData> | undefined;

  connect() {
    this.socket = io(import.meta.env.WEB_SOCKET_HOST) as Socket<EventData>;
  }

  disconnect() {
    this.socket?.disconnect();
  }

  emit<K extends EventNames>(eventName: K, ...args: Parameters<EventData[K]>) {
    if (this.socket) {
      this.socket.emit(eventName, ...args);
    }
  }

  on<K extends EventNames>(
    eventName: K,
    callback: (data: EventData[K]) => void
  ) {
    if (this.socket) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.socket.on(eventName, callback as any);
    }
  }
}
