import { createContext, useState } from "react";

const ExhibitionsContext = createContext({});

export function ExhibitionsProvider({ children }) {
  const [exhibitions, setExhibitions] = useState([]);
  return (
    <ExhibitionsContext.Provider value={{ exhibitions, setExhibitions }}>
      {children}
    </ExhibitionsContext.Provider>
  );
}
export default ExhibitionsContext;
