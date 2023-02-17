import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Bag from "../assets/svg/Bag";
import Webhook from "../assets/svg/Webhook";

const Navbar = styled.nav`
  height: 60px;
  padding: 0 2rem;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;

  @media screen and (min-width: 578px) {
    padding: 0 4rem;
  }
`;

const NavTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
`;

export const NavBar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <Navbar>
      <Link to="/">
        <NavTitle>
          <Webhook />
          OnlineShop
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
    </Navbar>
  );
};
