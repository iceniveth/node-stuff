import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./pages/Todos";
import Todos2, { loader as todos2Loader } from "./pages/Todos2";

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
    element: <Todos2 />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
