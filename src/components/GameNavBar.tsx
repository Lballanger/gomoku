import { Link } from "react-router-dom";

const GameNavBar = () => {
  return (
    <div className="w-full">
      <ul className="flex justify-center items-center w-full border-[1px] border-[#bbb] bg-[#2C3E50] text-white py-2">
        <li>
          <Link to="#" className="flex flex-col items-center gap-1 px-4">
            <lord-icon
              src="https://cdn.lordicon.com/hpivxauj.json"
              target="li"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            Chat
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center gap-1 px-4">
            <lord-icon
              src="https://cdn.lordicon.com/weoiqraa.json"
              target="li"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            Historique
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center gap-1 px-4">
            <lord-icon
              src="https://cdn.lordicon.com/enzmygww.json"
              trigger="loop"
              delay="20000"
              target="li"
              colors="primary:#ffffff"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            Aide
          </Link>
        </li>
        <li>
          <Link to="#" className="flex flex-col items-center gap-1 px-4">
            <lord-icon
              src="https://cdn.lordicon.com/nhfyhmlt.json"
              trigger="click"
              target="li"
              colors="primary:#ffffff"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            Quitter
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GameNavBar;
