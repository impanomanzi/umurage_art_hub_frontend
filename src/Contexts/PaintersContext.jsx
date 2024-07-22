import { createContext, useState } from "react";

const PaintersContext = createContext({});
export function PaintersProvider({ children }) {
  const [painters, setPainters] = useState({});
  return (
    <PaintersContext.Provider value={{ painters, setPainters }}>
      {children}
    </PaintersContext.Provider>
  );
}

export default PaintersContext;
