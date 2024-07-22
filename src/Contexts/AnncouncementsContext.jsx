import { createContext, useState } from "react";

const AnnouncementsContext = createContext({});
export function AnnouncementsProvider({ children }) {
  const [announcements, setAnnouncements] = useState([]);
  return (
    <AnnouncementsContext.Provider value={{ announcements, setAnnouncements }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}

export default AnnouncementsContext;
