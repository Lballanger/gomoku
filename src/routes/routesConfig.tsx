import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/Error";
import Gomoku from "../pages/Gomoku/Gomoku";

const routesConfig = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/gomoku",
    element: <Gomoku />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
];

export default routesConfig;
