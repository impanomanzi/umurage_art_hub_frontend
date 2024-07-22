import { createContext, useState } from "react";

const AuthContext = createContext(localStorage.getItem("token"));
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
