import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoutes = () => {
  const { token, isAdmin } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!token) {
      toast.error("Acces denied. Not authenticated", { position: "bottom-left", autoClose: 1500 });
    }
    if (token && !isAdmin) {
      toast.error("Acces denied. Not authorized", { position: "bottom-left", autoClose: 1500 });
    }
  }, [token, isAdmin]);

  if (!token) return <Navigate to="/login" />;
  if (token && !isAdmin) return <Navigate to="/cart" />;

  return <Outlet />;
};
