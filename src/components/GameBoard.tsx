import React, { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";

import symbolSound from "../assets/sounds/symbol.mp3";
import successSound from "../assets/sounds/success.mp3";

type GameBoardProps = {
  widthBoard: number;
  heightBoard: number;
  nbRows: number;
  pxCells: number;
};

const GameBoard: React.FC<GameBoardProps> = ({
  widthBoard,
  heightBoard,
  nbRows,
  pxCells,
}) => {
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<string>("");
  const room = "abc";

  const [winner, setWinner] = useState<number | null>(null);
  const [winningCells, setWinningCells] = useState<number[][]>([]);

  const initializeGrid = useCallback((rows: number, cols: number) => {
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = Array(cols).fill("");
      grid.push(row);
    }

    return grid;
  }, []);

  const [grid, setGrid] = useState<string[][]>(() =>
    initializeGrid(nbRows, pxCells)
  );

  const socketRef = useRef<Socket | null>(null); // Créer une référence mutable à socket
  const symbolSoundRef = useRef<HTMLAudioElement | null>(null);
  const successSoundRef = useRef<HTMLAudioElement | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === "") {
      console.log("socket.id", socketRef.current?.id);
      console.log("currentPlayer", currentPlayer);

      if (currentPlayer !== socketRef.current?.id) return; // Ignorer le clic si ce n'est pas le tour du joueur actuel

      const updatedGrid = [...grid];
      updatedGrid[row][col] = playerSymbol;
      setGrid(updatedGrid);

      // Envoyer la mise à jour de la grille au serveur
      socketRef.current?.emit("updateGrid", currentPlayer, updatedGrid);

      if (symbolSoundRef.current) symbolSoundRef.current.play();
    }
  };

  const resetBoard = useCallback(() => {
    setGrid(initializeGrid(nbRows, pxCells));
    setWinner(null);
    setWinningCells([]);
  }, [initializeGrid, nbRows, pxCells]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000"); // Affecter la valeur du socket à la référence mutable

    socketRef.current.emit("joinRoom", room); // Rejoindre la room spécifiée
    console.log("joinRoom abc");

    // Écouter l'événement "roomFull"
    socketRef.current.on("roomFull", (message: string) => {
      console.log(message); // Gérer l'erreur de room pleine
      socketRef.current?.disconnect(); // Déconnecter le socket
    });

    // Écouter l'événement "gridUpdated" émis par le serveur
    socketRef.current.on(
      "gridUpdated",
      (grid: string[][], currentPlayerId: string) => {
        console.log("newCurrentPlayerId", currentPlayerId);
        setCurrentPlayer(currentPlayerId);
        setGrid(grid);
      }
    );

    socketRef.current.on("playerSymbol", (symbol: string) => {
      console.log("playerSymbol", symbol);
      setPlayerSymbol(symbol);
    });

    // Écouter l'événement "gameOver" émis par le serveur
    socketRef.current.on(
      "gameOver",
      (winningPlayer: number, winningCells: number[][]) => {
        console.log("gameOver", winningPlayer, winningCells);
        console.log("winningPlayer", winningPlayer);

        setWinner(winningPlayer);
        setWinningCells(winningCells);

        // A adapter en fonction du gagnant ou du perdant
        if (successSoundRef.current) successSoundRef.current.play();

        // Afficher l'alerte
        if (winningPlayer === 1) {
          alert(`Le joueur ${winningPlayer} à gagné avec les O !`);
        } else if (winningPlayer === 2) {
          alert(`Le joueur ${winningPlayer} à gagné avec les X !`);
        }

        // Réinitialiser le plateau après 3 secondes
        setTimeout(() => {
          resetBoard();
        }, 3000);
      }
    );

    // Nettoyer les écouteurs d'événements lorsque le composant est démonté
    return () => {
      socketRef.current?.off("gridUpdated");
      socketRef.current?.off("gameOver");
      socketRef.current?.disconnect(); // Déconnecter le socket
    };
  }, [resetBoard]);

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
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
          const isWinningCell = winningCells.some(
            (coords) => coords[0] === rowIndex && coords[1] === colIndex
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
