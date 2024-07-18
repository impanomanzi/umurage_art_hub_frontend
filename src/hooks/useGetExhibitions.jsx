import { useEffect, useState } from "react";
import { API } from "../API/serverRequest";
import { toast } from "react-hot-toast";

export const useGetExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [exhibitionLoading, setLoading] = useState(true);

  const get_exhibitions = async () => {
    try {
      const data = await API.getExhibitions();
      setLoading(false);
      setExhibitions(data);
      localStorage.setItem("exhibitions", data?.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_exhibitions();
  }, []);

  return [exhibitionLoading, exhibitions];
};
