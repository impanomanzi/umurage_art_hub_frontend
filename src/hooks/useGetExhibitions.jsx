import { useEffect, useState } from "react";
import { API } from "../API/serverRequest";
import { toast } from "react-hot-toast";

export const useGetExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [exhibitionLoading, setLoading] = useState(true);

  const get_exhibitions = async () => {
    try {
      let data;
      try {
        data = await API.getExhibitions();
      } catch (error) {
        throw new Error(error);
      }
      if (data.success) {
        setLoading(false);
        setExhibitions(data.data);
        localStorage.setItem("exhibitions", data.data.length);
      } else {
        throw new Error("Network error");
      }
    } catch (error) {
      toast.error(String(error));
    }
  };
  useEffect(() => {
    get_exhibitions();
  }, []);

  return [exhibitionLoading, exhibitions];
};
