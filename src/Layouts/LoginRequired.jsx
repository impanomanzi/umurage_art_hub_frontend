import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LoginRequired() {
  const location = useLocation();
  const { auth } = useAuth();
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to={"/sign-in"} state={{ from: location.pathname }} />
  );
}

export default LoginRequired;
