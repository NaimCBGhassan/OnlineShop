import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuth } from "../../store/authSlice";

const AuthViewMobile = ({ setMenuView }) => {
  const { userLoaded, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.warning("Logged out", { position: "bottom-left" });
  };
  return (
    <StyledMenuMobile>
      <div onClick={() => setMenuView(false)}>
        {!userLoaded ? (
          <>
            <List to="/login">Login</List>
            <List to="/register">Register</List>
          </>
        ) : (
          <>
            {isAdmin && (
              <>
                <List to="/admin/summary">Summary</List>
                <List to="/admin/products">Products</List>
                <List to="/admin/orders">Orders</List>
                <List to="/admin/users">Users</List>
              </>
            )}
            <List onClick={handleLogout} className="text-white  cursor-pointer">
              Logout
            </List>
          </>
        )}
      </div>
    </StyledMenuMobile>
  );
};

export default AuthViewMobile;

const StyledMenuMobile = styled.nav`
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: stretch;
  background-color: rgba(0, 0, 0, 0.9);

  a:nth-child(odd) {
    background-color: rgb(30, 30, 30);
  }
  a:nth-child(even) {
    background-color: rgb(60, 60, 60);
  }
`;
const List = styled(Link)`
  text-align: center;
  display: block;
  padding: 2vh 0;
  font-size: 20px;
`;
