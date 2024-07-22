import { useContext } from "react";
import AnnouncementsContext from "../Contexts/AnncouncementsContext";

function useAnnouncements() {
  return useContext(AnnouncementsContext);
}

export default useAnnouncements;
