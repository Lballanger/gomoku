import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinRoom, socketConnection } from "../../services/slices/gameSlice";

function Home() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(socketConnection("true"));
    dispatch(joinRoom("abc"));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Morpion Gomoku</h1>
      <p className="text-lg text-center mb-8">
        Bienvenue dans le jeu du Morpion Gomoku ! Le but du jeu est d'aligner
        cinq de vos symboles (X ou O) en ligne verticale, horizontale ou
        diagonale. Le premier joueur à accomplir cela remporte la partie !
      </p>
      <Link
        to="/gomoku"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow"
        onClick={handleClick}
      >
        Commencer le jeu
      </Link>
    </div>
  );
}

export default Home;
