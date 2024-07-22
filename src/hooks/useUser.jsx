import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";

function useUser() {
  const { auth } = useAuth();
  let user;
  try {
    user = jwtDecode(localStorage.getItem("token"));
  } catch (error) {
    return {};
  }
  return user;
}

export default useUser;
