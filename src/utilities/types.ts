// =======================================================================================
// User
// =======================================================================================

export interface User {
  name: string;
  email: string;
  _id: string;
  createdAt: string;
}

export interface UsersState {
  users: User[];
  onlineUsersByUsername: string[];
  loading: boolean;
  error: string | null;
  typingUsers: string[];
}

// =======================================================================================
// Game
//

export interface GameState {
  socketId: string | null;
  rooms: RoomsState[] | null;
  room: RoomState;
  socketConnected: boolean;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

export interface RoomsState {
  name: string;
  capacity: number;
  path: string;
  activeConnections: number;
}

export interface RoomState {
  name: string | null;
  users: UserInRoom[] | null;
  gameList: GameList[] | null;
  grid: string[][] | null;
  playerSymbol: string | null;
  currentPlayer: string | null;
  winningPlayer: string | null;
  winningCells: string[][] | null;
  playerToInvite: string | null;
  receivedInvitation: string | null;
  gameId: string | null;
}

export interface UserInRoom {
  id: string;
  pseudo: string;
}

export interface GameList {
  id: string;
  players: string[];
  grid: string[][];
  winner: string | null;
}
export interface UpdateGridPayload {
  currentPlayer: string;
  updatedGrid: string[][];
}

// =======================================================================================
// Store
// =======================================================================================

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "success" | "error";
}
