import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuth } from "../../store/authSlice";

const AuthView = () => {
  const { userLoaded, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.warning("Logged out", { position: "bottom-left" });
  };
  return (
    <>
      {!userLoaded ? (
        <div className="flex gap-2 ">
          <Link to="/login" className="h-full p-2">
            Login
          </Link>
          <Link to="/register" className="h-full p-2">
            Register
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 ">
          {isAdmin && (
            <Link to="/admin" className="h-full p-2">
              Admin
            </Link>
          )}
          <div onClick={handleLogout} className="text-white h-full p-2 cursor-pointer">
            Logout
          </div>
        </div>
      )}
    </>
  );
};

export default AuthView;
