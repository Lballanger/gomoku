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
  room: RoomState;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

export interface UserInRoom {
  id: string;
  pseudo: string;
}
export interface RoomState {
  name: string | null;
  users: UserInRoom[] | null;
  grid: string[][] | null;
  playerSymbol: string | null;
  currentPlayer: string | null;
  winningPlayer: string | null;
  winningCells: string[][] | null;
  playerToInvite: string | null;
  receivedInvitation: string | null;
  gameId: string | null;
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
