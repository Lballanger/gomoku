import React, { useEffect, useRef, useState } from "react";

import { RootState } from "../services/store";

import { useDispatch, useSelector } from "react-redux";
import { resetBoard, setUpdateGrid } from "../services/slices/gameSlice";

import symbolSound from "../assets/sounds/symbol.mp3";
import successSound from "../assets/sounds/success.mp3";
import { useParams, useNavigate } from "react-router-dom";

type GameBoardProps = {
  nbRows: number;
  pxCells: number;
};

const GameBoard: React.FC<GameBoardProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { socketId } = useSelector((state: RootState) => state.game);

  const { gameId } = useSelector((state: RootState) => state.game.room);

  const { grid, currentPlayer, playerSymbol, winningPlayer, winningCells } =
    useSelector((state: RootState) => state.game.room);

  const [selectedCell, setSelectedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const [hightlightedCell, setHighlightedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const symbolSoundRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (grid && grid[row][col] === "") {
      if (currentPlayer !== socketId) return; // Ignorer le clic si ce n'est pas le tour du joueur actuel

      if (!selectedCell) {
        setSelectedCell({ row, col });
        setHighlightedCell({ row, col });
      } else if (selectedCell.row === row && selectedCell.col === col) {
        const updatedGrid = Array.from(grid, (rowArray) => [...rowArray]);
        if (playerSymbol !== null && currentPlayer !== null) {
          updatedGrid[row][col] = playerSymbol;
          dispatch(setUpdateGrid({ currentPlayer, updatedGrid }));
        }
        setSelectedCell(null);
        setHighlightedCell(null);
      } else {
        setSelectedCell({ row, col });
        setHighlightedCell({ row, col });
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
        navigate(`/gomoku/room/${id}`, { replace: true });
      }, 3000);
    }
  }, [dispatch, winningPlayer, navigate, id]);

  // Redirection vers la page de la room si l'ID de la partie n'est pas définie
  useEffect(() => {
    if (!gameId) {
      navigate(`/gomoku/room/${id}`, { replace: true });
    }
  }, [gameId, navigate, id]);

  const renderGrid = () => {
    return grid?.map((row, rowIndex) => (
      <div key={`row-${rowIndex}`} className="flex justify-center items-center">
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
              className={`
              max-sm:w-8 max-sm:h-8
              max-sm:aspect-w-1 max-sm:aspect-h-1
              max-md:w-12 max-md:h-10 
              max-lg:w-12 max-lg:h-10
              w-12 h-11
              flex items-center justify-center text-2xl text-white
              "  cursor-pointer
              ${isWinningCell ? "bg-yellow-300" : "bg-[#2C3E50]"}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderImage:
                  "linear-gradient(10deg, #009bf6, #A1FFCE, #009bf6, #FAFFD1) 1",
                backgroundColor: `${
                  hightlightedCell?.row === rowIndex &&
                  hightlightedCell?.col === colIndex
                    ? "#63717f"
                    : "#2C3E50"
                }`,
              }}
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
