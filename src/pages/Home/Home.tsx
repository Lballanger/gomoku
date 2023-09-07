import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../services/store";

import Header from "../../components/Header";

function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const { rooms } = useSelector((state: RootState) => state.game);

  const handleRoomSelection = (path: string) => {
    setSelectedRoom(path);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg text-center mb-8 mx-2">
          Bienvenue dans le jeu du Morpion Gomoku ! Le but du jeu est d'aligner
          cinq de vos symboles (X ou O) en ligne verticale, horizontale ou
          diagonale. Le premier joueur à accomplir cela remporte la partie !
        </p>
        <div className="border rounded-lg p-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Choisissez une salle</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-4">
              <ul className="flex flex-col items-center justify-center">
                {rooms &&
                  rooms.map((room) => (
                    <li
                      key={room.name}
                      className={`flex flex-row items-center justify-between rounded-s-lg my-1  border border-white cursor-pointer ${
                        selectedRoom === room.path ? " rounded-e-lg border" : ""
                      }`}
                      style={
                        selectedRoom === room.path
                          ? {
                              border: "1px solid blue",
                              backgroundColor: "#f0f8ff",
                            }
                          : {}
                      }
                      onClick={() => handleRoomSelection(room.path)}
                    >
                      <span
                        className={`mx-2 ${
                          selectedRoom === room.path ? "" : ""
                        }`}
                      >{`Salle ${room.path}`}</span>
                      <span
                        className={`px-2 py-1 bg-green-500 text-white font-semibold rounded-e-lg ${
                          selectedRoom === room.path ? "" : ""
                        }`}
                      >
                        {room.activeConnections} / {room.capacity}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <Link
          to={selectedRoom ? `/gomoku/room/${selectedRoom}` : "#"}
          className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow
          ${selectedRoom ? "" : "opacity-50 cursor-not-allowed"}
          `}
        >
          Rejoindre
        </Link>
      </div>
    </>
  );
}

export default Home;
