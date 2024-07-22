import { useContext } from "react";
import PaintersContext from "../Contexts/PaintersContext";

function usePainters() {
  return useContext(PaintersContext);
}

export default usePainters;
