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
  Product,
  ProductsList,
  Orders,
  Users,
  Order,
  User,
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
        path: "/product/:id",
        element: <Product />,
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
                    index: true,
                    element: <ProductsList />,
                  },
                  {
                    path: "create-product",
                    element: <CreateProducts />,
                  },
                  {
                    path: "product/:id",
                    element: <Product />,
                  },
                ],
              },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "order/:id",
                element: <Order />,
              },
              {
                path: "users",
                element: <Users />,
              },
              {
                path: "user/:id",
                element: <User />,
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
