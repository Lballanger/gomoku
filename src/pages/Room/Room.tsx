import { useEffect, useState } from "react";
import { RootState } from "../../services/store";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "../../services/slices/gameSlice";
import ReceivedInviteModal from "../../components/ReceivedInviteModal";
import SentInviteModal from "../../components/SentInviteModal";

const Room = () => {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const { users, receivedInvitation } = useSelector(
    (state: RootState) => state.game.room
  );

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const [showReceivedModal, setShowReceivedModal] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);

  const handleAccept = () => {
    setShowReceivedModal(false);
  };

  const handleDecline = () => {
    setShowReceivedModal(false);
  };

  // Fake data for the list of games
  const games = [
    { id: 1, name: "Partie 1" },
    { id: 2, name: "Partie 2" },
    { id: 3, name: "Partie 3" },
  ];

  const handlePlayerSelection = (id: string) => {
    setSelectedPlayer(id);
  };

  const handleClick = () => {
    if (!selectedPlayer) return;
    dispatch(sendInvite(selectedPlayer));
    setShowSentModal(true);
  };

  useEffect(() => {
    if (receivedInvitation) {
      setShowReceivedModal(true);
    }
  }, [receivedInvitation]);

  return (
    <div className="flex justify-center items-center h-screen mr-4">
      {receivedInvitation && showReceivedModal && (
        <ReceivedInviteModal
          playerToInvite={receivedInvitation}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      {selectedPlayer && showSentModal && (
        <SentInviteModal
          onCancel={() => setShowSentModal(false)}
          receivedInvitation={selectedPlayer}
        />
      )}
      <div className="bg-white rounded shadow-md p-4 mr-4">
        <h2 className="text-xl font-semibold mb-4">
          Parties en cours en salle {id} :
        </h2>
        <div className="gamesList">
          <table className="w-full">
            <thead>
              <tr>
                <th className="font-bold p-2">Id</th>
                <th className="font-bold p-2">Nom</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td className="p-2">{game.id}</td>
                  <td className="p-2">{game.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Joueurs connectés</h2>
        <div className="playersList">
          <table className="w-full">
            <thead>
              <tr>
                <th className="font-bold p-2">Id</th>
                <th className="font-bold p-2">Pseudo</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => handlePlayerSelection(user.id)}
                    onDoubleClick={() => handlePlayerSelection(user.id)}
                    className="cursor-pointer"
                    style={
                      selectedPlayer === user.id
                        ? {
                            border: "1px solid blue",
                            backgroundColor: "#f0f8ff",
                          }
                        : {}
                    }
                  >
                    <td className="p-2">{user.id}</td>
                    <td className="p-2">{user.pseudo}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button
            className="p-4 py-2 my-2 bg-blue-500 text-white font-semibold rounded shadow"
            onClick={handleClick}
          >
            Défier {selectedPlayer}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Room;
