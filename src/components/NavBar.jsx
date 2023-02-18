import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import Bag from "../assets/svg/Bag";
import Webhook from "../assets/svg/Webhook";
import MenuHamburgesa from "../assets/svg/MenuHamburgesa";
import { useState } from "react";

const Navbar = styled.nav`
  height: 60px;
  padding: 0 2rem;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
`;

const NavTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
`;

export const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 578px)" });
  const [menuView, setMenuView] = useState(false);

  return (
    <Navbar>
      <Link to="/">
        <NavTitle>
          <Webhook />
          <span className="text-[5vh]">OnlineShop</span>
        </NavTitle>
      </Link>
      <Link to="/cart">
        <div className="relative">
          <Bag />
          <span className="grid absolute bottom-0 -right-1 bg-yellow-400  h-5 w-5 rounded-full">
            <span className="place-self-center text-black font-bold text-sm">{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
      {isTabletOrMobile ? (
        <button
          className="fixed bottom-2 right-2 z-10 grid place-content-center h-12 w-12 text-white bg-black rounded-full border-none cursor-pointer"
          onClick={() => setMenuView(!menuView)}
        >
          <MenuHamburgesa />
        </button>
      ) : (
        <div className="flex gap-2 ">
          <Link to="/login" className="h-full p-2 cursor-pointer">
            Login
          </Link>
          <Link to="/register" className="h-full p-2 cursor-pointer">
            Register
          </Link>
        </div>
      )}
    </Navbar>
  );
};
