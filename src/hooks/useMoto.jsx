import { useContext } from "react";
import MotoContext from "../Contexts/MotoContext";

function useMoto() {
  return useContext(MotoContext);
}

export default useMoto;
