import { useNavigate, useParams } from "react-router-dom";
import GameBoard from "../../components/GameBoard";
import GameHeader from "../../components/GameHeader";
import GameNavBar from "../../components/GameNavBar";
import MobileNavbar from "../../components/MobileNavBar";
import Chat from "../../components/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  leaveGameRoom,
  sentMessageInGame,
} from "../../services/slices/gameSlice";
import { RootState } from "../../services/store";
import { Message } from "../../utilities/types";
import { useEffect } from "react";

const Gomoku = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, gameId } = useParams<{ id: string; gameId: string }>();

  const { gameMessage } = useSelector((state: RootState) => state.game.room);

  const onCloseClick = () => {
    navigate(`/gomoku/room/${id}`, { replace: true });
  };

  const sendMessage = (messageText: string) => {
    // Créez un objet Message avec un expéditeur fictif, puis envoyez-le
    const message: Message = {
      sender: "Utilisateur", // Mettez le nom de l'expéditeur souhaité ici
      text: messageText,
    };

    dispatch(sentMessageInGame(message));
  };

  useEffect(() => {
    return () => {
      if (gameId) {
        dispatch(leaveGameRoom(true));
      }
    };
  }, [dispatch, gameId]);

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between lg:flex-row-reverse lg:justify-start lg:items-center">
      <div className="lg:w-1/3 lg:mx-2 lg:border-[3px] lg:border-[#bbb]">
        <MobileNavbar title="Gomoku" onCloseClick={onCloseClick} />
        <GameHeader />
        <Chat
          messages={gameMessage}
          sendMessage={sendMessage}
          maxHeight={"max-h-[350px]"}
        />
      </div>
      <div className="mx-[10px]">
        <GameBoard nbRows={13} pxCells={13} />
      </div>
      <div className="lg:hidden">
        <GameNavBar />
      </div>
    </div>
  );
};

export default Gomoku;
