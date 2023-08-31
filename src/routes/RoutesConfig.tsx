import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/Error";
import Room from "../pages/Room/Room";
import Gomoku from "../pages/Gomoku/Gomoku";
import RoomGameProvider from "./RoomGameProvider";

const routesConfig = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    element: <RoomGameProvider />,
    children: [
      {
        path: "/gomoku/room/:id",
        element: <Room />,
      },
      {
        path: "/gomoku/room/:id/game/:gameId",
        element: <Gomoku />,
      },
    ],
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
