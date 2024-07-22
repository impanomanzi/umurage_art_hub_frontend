import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";

function Logout() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedOut(true);
  };
  useEffect(() => {
    logout();
  }, []);
  return !isLoggedOut ? (
    <Spinner />
  ) : (
    <Navigate to={"/sign-in"} state={{ message: "Logged out" }} />
  );
}

export default Logout;
