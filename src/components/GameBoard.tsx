import React, { useEffect, useRef } from "react";

import { RootState } from "../services/store";

import { useDispatch, useSelector } from "react-redux";
import { resetBoard, setUpdateGrid } from "../services/slices/gameSlice";

import symbolSound from "../assets/sounds/symbol.mp3";
import successSound from "../assets/sounds/success.mp3";
import { useParams, useNavigate } from "react-router-dom";

type GameBoardProps = {
  widthBoard: number;
  heightBoard: number;
  nbRows: number;
  pxCells: number;
};

const GameBoard: React.FC<GameBoardProps> = ({ widthBoard, heightBoard }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { socketId, error } = useSelector((state: RootState) => state.game);

  const { grid, currentPlayer, playerSymbol, winningPlayer, winningCells } =
    useSelector((state: RootState) => state.game.room);

  console.log(error);

  const symbolSoundRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (grid && grid[row][col] === "") {
      if (currentPlayer !== socketId) return; // Ignorer le clic si ce n'est pas le tour du joueur actuel

      const updatedGrid = Array.from(grid, (rowArray) => [...rowArray]);

      if (playerSymbol !== null && currentPlayer !== null) {
        updatedGrid[row][col] = playerSymbol;
        dispatch(setUpdateGrid({ currentPlayer, updatedGrid }));
      }

      // if (symbolSoundRef.current) symbolSoundRef.current.play();
    }
  };

  useEffect(() => {
    // Afficher l'alerte
    if (winningPlayer && winningPlayer === socketId) {
      if (successSoundRef.current) successSoundRef.current.play();
      alert(`Vous avez gagné avec les O !`);
    } else if (winningPlayer && winningPlayer !== socketId) {
      alert(`Vous avez perdu avec les X !`);
    }
  }, [socketId, winningPlayer]);

  useEffect(() => {
    // Réinitialiser le plateau après 3 secondes
    if (winningPlayer) {
      setTimeout(() => {
        dispatch(resetBoard("true"));
        navigate(`/gomoku/room/${id}`);
      }, 3000);
    }
  }, [dispatch, winningPlayer, navigate, id]);

  const renderGrid = () => {
    return grid?.map((row, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="flex justify-center px-1" // Utiliser flex-wrap pour permettre le retour à la ligne des cellules
      >
        <audio ref={symbolSoundRef}>
          <source src={symbolSound} type="audio/mpeg" />
        </audio>
        <audio ref={successSoundRef}>
          <source src={successSound} type="audio/mpeg" />
        </audio>

        {row.map((cell, colIndex) => {
          const isWinningCell = winningCells?.some(
            (coords) =>
              coords[0] === String(rowIndex) && coords[1] === String(colIndex)
          );

          return (
            <div
              key={`row-${rowIndex}-cell-${colIndex}`}
              className={`w-[${widthBoard}px] h-[${heightBoard}px] max-sm:w-12 max-sm:h-8 max-md:w-16 max-md:h-16 max-lg:w-20 max-lg:h-16 xl:w-20 xl:h-16 max-sm:aspect-w-1 max-sm:aspect-h-1 border border-[#ffffff] flex items-center justify-center text-2xl text-[#000000]  cursor-pointer 
              ${isWinningCell ? "bg-yellow-300" : "bg-[#ebdcb2]"}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          );
        })}
      </div>
    ));
  };

  return <div id="grid">{renderGrid()}</div>;
};

export default GameBoard;
