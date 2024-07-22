import { API } from "../API/serverRequest";
import usePaintings from "./usePaintings";
export const useGetPaintings = () => {
  const { setPaintings } = usePaintings();

  const getPaintings = async () => {
    try {
      const data = await API.getPaintings();
      setPaintings(data);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return getPaintings;
};
