import { useContext } from "react";
import APIContext from "../Contexts/APIContext";

function useAPI() {
  return useContext(APIContext);
}

export default useAPI;
