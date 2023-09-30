import Timer from "./Timer";

function GameHeader() {
  return (
    <div className="flex justify-between max-w-[650px] m-auto ">
      <div className="w-[40%] flex">
        <div className="max-w-[132px] relative">
          <img
            src="https://img.freepik.com/premium-vector/man-character_665280-46970.jpg?w=740"
            alt=""
            className="mb-2"
          />

          <h1 className=" font-bold absolute bottom-0 left-0 w-full text-center">
            Player 1
          </h1>
        </div>
        <div className="w-1/4 flex justify-center items-center font-bold">
          0
        </div>
      </div>

      <div className="w-[20%] h-fit flex justify-center font-bold text-xl p-1">
        <Timer />
      </div>

      <div className="w-[40%] flex justify-end">
        <div className="w-1/4 flex justify-center items-center font-bold">
          0
        </div>
        <div className="max-w-[132px] relative">
          <img
            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?w=740"
            alt=""
            className="mb-2 max-w-[132px]"
          />

          <h1 className=" font-bold absolute bottom-0 left-0 w-full text-center">
            Player 2
          </h1>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
