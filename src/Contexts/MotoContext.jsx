import { createContext, useState } from "react";

const MotoContext = createContext();
export function MotoProvider({ children }) {
  const [viewMoto, setViewMoto] = useState(true);
  return (
    <MotoContext.Provider value={{ viewMoto, setViewMoto }}>
      {children}
    </MotoContext.Provider>
  );
}
export default MotoContext;
