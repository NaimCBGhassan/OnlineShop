import { createBrowserRouter } from "react-router-dom";

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
        element: <Dashboard />,
        children: [
          {
            index: true,
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
