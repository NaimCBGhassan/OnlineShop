import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearAuth } from "../../store/authSlice";

const AuthView = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    toast.warning("Logged out", { position: "bottom-left" });
  };
  return (
    <>
      {!auth.userLoaded ? (
        <div className="flex gap-2 ">
          <Link to="/login" className="h-full p-2">
            Login
          </Link>
          <Link to="/register" className="h-full p-2">
            Register
          </Link>
        </div>
      ) : (
        <button onClick={handleLogout} className="bg-transparent text-white h-full p-2 text-base">
          Logout
        </button>
      )}
    </>
  );
};

export default AuthView;
