import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms = [
    { name: "Salle 1", capacity: "0/100", path: "1" },
    { name: "Salle 2", capacity: "0/100", path: "2" },
    { name: "Salle 3", capacity: "0/100", path: "3" },
  ];

  const handleRoomSelection = (path: string) => {
    setSelectedRoom(path);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Morpion Gomoku</h1>
      <p className="text-lg text-center mb-8">
        Bienvenue dans le jeu du Morpion Gomoku ! Le but du jeu est d'aligner
        cinq de vos symboles (X ou O) en ligne verticale, horizontale ou
        diagonale. Le premier joueur à accomplir cela remporte la partie !
      </p>
      <div className="border rounded-lg p-4 mb-8">
        <h2 className="text-xl font-bold mb-4">Choisissez une salle</h2>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <ul className="flex flex-col items-center justify-center">
              {rooms.map((room) => (
                <li
                  key={room.name}
                  className={`flex flex-row items-center justify-between rounded-s-lg my-1  border border-white cursor-pointer ${
                    selectedRoom === room.path ? " rounded-e-lg border" : ""
                  }`}
                  style={
                    selectedRoom === room.path
                      ? { border: "1px solid blue", backgroundColor: "#f0f8ff" }
                      : {}
                  }
                  onClick={() => handleRoomSelection(room.path)}
                >
                  <span
                    className={`mx-2 ${selectedRoom === room.path ? "" : ""}`}
                  >{`Salle ${room.path}`}</span>
                  <span
                    className={`px-2 py-1 bg-green-500 text-white font-semibold rounded-e-lg ${
                      selectedRoom === room.path ? "" : ""
                    }`}
                  >
                    {room.capacity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link
        to={selectedRoom ? `/gomoku/room/${selectedRoom}` : "#"}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow"
      >
        Rejoindre
      </Link>
    </div>
  );
}

export default Home;
