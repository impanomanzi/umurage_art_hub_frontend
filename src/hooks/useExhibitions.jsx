import ExhibitionsContext from "../Contexts/ExhibitionsContext";
import { useContext } from "react";
function useExhibitions() {
  return useContext(ExhibitionsContext);
}

export default useExhibitions;
