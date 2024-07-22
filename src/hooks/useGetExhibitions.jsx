import { API } from "../API/serverRequest";
import useExhibitions from "./useExhibitions";

export const useGetExhibitions = () => {
  const { setExhibitions } = useExhibitions();

  const getExhibitions = async () => {
    try {
      const data = await API.getExhibitions();
      setExhibitions(data?.data);
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return getExhibitions;
};
