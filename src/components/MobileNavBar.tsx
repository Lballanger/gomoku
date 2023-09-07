import React from "react";

const MobileNavbar: React.FC<{
  onBackClick: () => void;
  onCloseClick: () => void;
}> = ({ onBackClick, onCloseClick }) => {
  return (
    <div className="p-4 flex justify-between items-center w-full bg-white sticky top-0">
      <button
        className="text-blue-500 font-semibold text-xl"
        onClick={onBackClick}
      >
        &lt;
      </button>
      <h1 className="text-xl font-semibold font-mono">Gomoku</h1>
      <button
        className="text-blue-500 font-semibold text-xl"
        onClick={onCloseClick}
      >
        X
      </button>
    </div>
  );
};

export default MobileNavbar;
