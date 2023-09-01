import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  joinRoom,
  leaveRoom,
  socketConnection,
} from "../services/slices/gameSlice";
import { useEffect } from "react";
import { RootState } from "../services/store";

const SocketIOProvider = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { socketId } = useSelector((state: RootState) => state.game);

  const { gameId } = useSelector((state: RootState) => state.game.room);

  useEffect(() => {
    if (id && !socketId) {
      dispatch(socketConnection("true"));
      dispatch(joinRoom(id));
    }
  }, [dispatch, id, socketId]);

  useEffect(() => {
    // Déconnexion du socket.io lorsque le composant est démonté

    return () => {
      console.log("Playroom left");
      if (id) {
        dispatch(leaveRoom(id));
      }
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (gameId) {
      navigate(`/gomoku/room/${id}/game/${gameId}`);
    }
  }, [gameId, navigate, id]);

  return <Outlet />;
};

export default SocketIOProvider;
