import React, { useEffect, useState } from "react";
import settings from "../components/settings.json";

export const useGetPaintings = () => {
  const [paintings, setPaintings] = useState([]);
  const [paintingLoading, setPaintingLoading] = useState(true);

  const getPaintings = async () => {
    try {
      const res = await fetch(`${settings.server_domain}/get_paintings`);
      const data = await res.json();
      setPaintingLoading(false);
      setPaintings(data);
      localStorage.setItem("paintings", data.data.length);
    } catch (er) {
      console.log(er);
    }
  };
  useEffect(() => {
    (async () => {
      await getPaintings();
    })();
  }, []);

  return [paintingLoading, paintings];
};
