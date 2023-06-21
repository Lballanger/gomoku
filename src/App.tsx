import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesConfig from "./routes/routesConfig";

const router = createBrowserRouter(routesConfig);

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
