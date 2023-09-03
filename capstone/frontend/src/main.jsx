import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./pages/Todos";
import Todos2, {
  loader as todos2Loader,
  action as todos2Action,
} from "./pages/Todos2";
import Uploader from "./pages/Uploader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/todos",
    element: <Todos />,
  },
  {
    path: "/todos2",
    loader: todos2Loader,
    action: todos2Action,
    element: <Todos2 />,
  },
  {
    path: "/uploader",
    element: <Uploader />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
