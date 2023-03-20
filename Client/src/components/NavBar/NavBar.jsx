import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import Bag from "../../assets/svg/Bag";
import Webhook from "../../assets/svg/Webhook";
import MenuHamburgesa from "../../assets/svg/MenuHamburgesa";
import { useState } from "react";
import AuthViewDesktop from "./AuthViewDesktop";
import AuthViewMobile from "./AuthViewMobile";

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
        <>
          <Button onClick={() => setMenuView(!menuView)}>
            <MenuHamburgesa />
          </Button>
          {menuView && <AuthViewMobile setMenuView={setMenuView} />}
        </>
      ) : (
        <AuthViewDesktop />
      )}
    </Navbar>
  );
};

const Navbar = styled.nav`
  height: 60px;
  padding: 0 2rem;
  background-color: #000000;
  position: sticky;
  z-index: 1;
  top: 0;
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

const Button = styled.button`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 10;
  display: grid;
  place-items: center;
  color: white;
  background-color: black;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
`;
