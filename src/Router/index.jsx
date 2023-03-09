import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "../components";

import {
  Layout,
  NotFound,
  Home,
  Cart,
  Register,
  LogIn,
  Dashboard,
  Products,
  Summary,
  CreateProducts,
} from "../Pages/index";

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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/admin",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "",
            element: <Dashboard />,
            children: [
              {
                path: "",
                element: <Summary />,
              },
              {
                path: "summary",
                element: <Summary />,
              },
              {
                path: "products",
                element: <Products />,
                children: [
                  {
                    path: "create-product",
                    element: <CreateProducts />,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
