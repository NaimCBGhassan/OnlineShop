import { Outlet } from "react-router-dom";

import { NavBar } from "../components/index.jsx";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
