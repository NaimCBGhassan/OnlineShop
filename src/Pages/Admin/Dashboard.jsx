import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { FaUsers, FaStore, FaClipboard, FaTachometerAlt } from "react-icons/fa";

export const Dashboard = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <StyledDashboard>
      {!isTabletOrMobile && (
        <SideNav>
          <h3>Quick Links</h3>
          <NavLink className={({ isActive }) => (isActive ? "link-active" : "link-inactive")} to="/admin/summary">
            <FaTachometerAlt /> Summary
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "link-active" : "link-inactive")} to="/admin/products">
            <FaStore /> Products
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "link-active" : "link-inactive")} to="/admin/orders">
            <FaClipboard /> Orders
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? "link-active" : "link-inactive")} to="/admin/users">
            <FaUsers /> Users
          </NavLink>
        </SideNav>
      )}
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;
const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  overflow-y: auto;
  position: fixed;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }
  a {
    margin-bottom: 1rem;
    font-size: 14px;
    display: flex;
    align-items: center;
    font-weight: 700;

    svg {
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }

  .link-active {
    color: #4b70e2;
    border-left: 3px solid #4b70e2;
    padding-left: 5px;
    border-radius: 2px;
  }
  .link-inactive {
    color: rgb(97, 97, 97);
  }
`;
const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
