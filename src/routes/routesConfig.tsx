import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/Error";
import Room from "../pages/Room/Room";

const routesConfig = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/gomoku/room/:id",
    element: <Room />,
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
