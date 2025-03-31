import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser";
function AdminRequired() {
  const location = useLocation();
  const user = useUser();
  return user.role == "admin" ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/sign-in"}
      state={{
        from: location.pathname,
      }}
    />
  );
}

export default AdminRequired;
 