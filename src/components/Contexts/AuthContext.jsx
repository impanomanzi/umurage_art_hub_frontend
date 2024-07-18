import { createContext } from "react";

const AuthContext = createContext(sessionStorage.getItem("token"));
export default AuthContext;
