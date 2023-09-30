import React from "react";

const MobileNavbar: React.FC<{
  title: string;
  onCloseClick: () => void;
}> = ({ title, onCloseClick }) => {
  return (
    <div className="p-4 flex justify-between items-center w-full bg-white sticky top-0 ">
      <h1 className="text-xl font-semibold font-mono">{title}</h1>
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
