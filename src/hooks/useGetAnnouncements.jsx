import useAnnouncements from "./useAnnouncements";
import { API } from "../API/serverRequest";
function useGetAnnouncements() {
  const { setAnnouncements } = useAnnouncements();
  const getAnnouncements = async () => {
    try {
      const resp = await API.getAnnouncements();
      setAnnouncements(resp.data);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return getAnnouncements;
}

export default useGetAnnouncements;
