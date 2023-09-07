import { useEffect, useState } from "react";
import { RootState } from "../../services/store";
import { useDispatch, useSelector } from "react-redux";
import { acceptInvite, sendInvite } from "../../services/slices/gameSlice";
import ReceivedInviteModal from "../../components/ReceivedInviteModal";
import SentInviteModal from "../../components/SentInviteModal";
import MobileNavbar from "../../components/MobileNavBar";

const Room = () => {
  const dispatch = useDispatch();

  const { users, receivedInvitation } = useSelector(
    (state: RootState) => state.game.room
  );

  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const [showReceivedModal, setShowReceivedModal] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);

  const handleAccept = () => {
    if (receivedInvitation) {
      dispatch(acceptInvite(receivedInvitation));
      setShowReceivedModal(false);
    }
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
    <>
      <div className="h-screen text-blue-500">
        <MobileNavbar
          onBackClick={() => window.history.back()}
          onCloseClick={() => (window.location.href = "/")}
        />
        <div className="flex flex-col justify-center lg:flex-row">
          <div className="left rounded h-1/2 w-full px-4 lg:m-3 lg:h-[740px] lg:w-1/2 lg:flex lg:flex-col lg:justify-between">
            <div className=" rounded h-[350px] px-4 mt-5 overflow-auto lg:shadow-md lg:p-2 lg:mt-0 ">
              <h2 className="text-xl font-semibold mb-4 font-mono text-center">
                Parties en cours
              </h2>
              <div className="gamesList">
                <table className="">
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
            <div className="relative rounded h-[350px] px-4 mt-5 lg:shadow-md lg:p-2 lg:mt-0 lg:block hidden ">
              <h2 className="text-xl font-semibold mb-4 font-mono text-center">
                Chat
              </h2>
              <div className="chat">
                <div className="messages">
                  <div className="message">
                    <span className="font-semibold"></span>
                    <span className="text-sm"></span>
                  </div>
                </div>
                <div className="input absolute bottom-0 left-0 w-full">
                  <input
                    type="text"
                    className="w-full p-2 rounded border-2 border-blue-500"
                    placeholder="Message"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded h-1/2 w-full px-4 lg:m-3 lg:h-[740px] lg:w-1/3 lg:shadow-md overflow-auto lg:relative">
            <h2 className="text-xl font-semibold mb-4 font-mono text-center">
              Joueurs connectés
            </h2>
            <div className="playersList">
              <form>
                <table className=" w-full">
                  <tbody>
                    <thead>
                      <tr>
                        <th className="p-2"></th>
                        <th className="p-2">Pseudo</th>
                      </tr>
                    </thead>
                    {users &&
                      users.map((user) => (
                        <tr
                          key={user.id}
                          onClick={() => handlePlayerSelection(user.id)}
                          onDoubleClick={() => handlePlayerSelection(user.id)}
                          className={`cursor-pointer flex ${
                            selectedPlayer === user.id
                              ? "border-1 border-blue-500 bg-blue-100"
                              : ""
                          }`}
                        >
                          <td className="p-2">
                            <input
                              type="radio"
                              id={user.id}
                              name="selectedPlayer"
                              value={user.id}
                              checked={selectedPlayer === user.id}
                              onChange={() => handlePlayerSelection(user.id)}
                            />
                          </td>
                          <td className="p-2">
                            <label htmlFor={user.id}>{user.pseudo}</label>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </form>

              <button
                className="p-4 py-4 mt-2 bg-blue-500 text-white font-semibold  shadow m-auto w-full absolute bottom-0 left-0"
                onClick={handleClick}
              >
                Défier {selectedPlayer}
              </button>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Room;
