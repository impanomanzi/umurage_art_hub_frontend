import { createContext, useState } from "react";

const PaintingsContext = createContext({});
export function PaintingsProvider({ children }) {
  const [paintings, setPaintings] = useState([]);
  return (
    <PaintingsContext.Provider value={{ paintings, setPaintings }}>
      {children}
    </PaintingsContext.Provider>
  );
}

export default PaintingsContext;
