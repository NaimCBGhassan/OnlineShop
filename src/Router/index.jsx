import { createBrowserRouter } from "react-router-dom";

import { Layout, NotFound, Home, Cart, Register, LogIn } from "../Pages/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
