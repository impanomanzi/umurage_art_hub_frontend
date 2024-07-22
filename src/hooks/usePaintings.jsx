import { useContext } from "react";
import PaintingsContext from "../Contexts/PaintingsContext";

function usePaintings() {
  return useContext(PaintingsContext);
}

export default usePaintings;
