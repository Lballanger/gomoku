import GameBoard from "../../components/GameBoard";

const Gomoku = () => {
  return (
    <div>
      <h1>Gomoku</h1>
      <div className="">
        <GameBoard widthBoard={51} heightBoard={51} nbRows={13} pxCells={13} />
      </div>
    </div>
  );
};

export default Gomoku;
