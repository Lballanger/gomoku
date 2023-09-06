import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes/RoutesConfig";
import { useDispatch } from "react-redux";
import { socketConnection } from "./services/slices/gameSlice";
import { useEffect } from "react";

const router = createBrowserRouter(RoutesConfig);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(socketConnection("true"));
  }, [dispatch]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
