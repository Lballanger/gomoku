import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes/RoutesConfig";

const router = createBrowserRouter(RoutesConfig);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
