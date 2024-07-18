import { useState } from "react";

const useGetToken = () => {
  const [token, setToken] = useState("");
  const getToken = () => {
    setToken(sessionStorage.getItem("token"));
  };
  getToken();
  return token;
};
export default useGetToken;
