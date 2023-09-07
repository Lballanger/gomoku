import { Link } from "react-router-dom";
import Logo from "../assets/img/Logo";

const Header = () => {
  return (
    <header className="flex justify-center">
      <Link to="/">
        <Logo width={"100%"} />
      </Link>
    </header>
  );
};

export default Header;
