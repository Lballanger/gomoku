import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

// Import de l'interface AuthState depuis le slice authSlice
import { AuthState } from "../services/slices/authSlice"; // Chemin d'importation approprié

interface RootState {
  auth: AuthState;
}

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
};

export default PrivateRoute;
