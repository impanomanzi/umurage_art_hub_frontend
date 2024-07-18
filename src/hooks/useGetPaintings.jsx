import { useEffect, useState } from "react";
import { API } from "../API/serverRequest";
import toast from "react-hot-toast";
export const useGetPaintings = () => {
  const [paintings, setPaintings] = useState([]);
  const [paintingLoading, setPaintingLoading] = useState(true);

  const getPaintings = async () => {
    try {
      let data;
      try {
        data = await API.getPaintings();
      } catch (error) {
        throw new Error(error);
      }
      setPaintingLoading(false);
      setPaintings(data);
    } catch (error) {
      toast.error(String(error));
    }
  };
  useEffect(() => {
    getPaintings();
  }, []);

  return [paintingLoading, paintings];
};
