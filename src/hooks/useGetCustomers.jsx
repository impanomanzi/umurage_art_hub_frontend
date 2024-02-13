import React, { useEffect, useState } from "react";
import settings from "../components/settings.json";

export const useGetExhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [exhibitionLoading, setLoading] = useState(true);

  const get_exhibitions = async () => {
    try {
      const res = await fetch(`${settings.server_domain}/get_exhibitions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      });
      const data = await res.json();
      setLoading(false);
      setExhibitions(data);
      localStorage.setItem("exhibitions", data.length);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      await get_exhibitions();
    })();
  }, []);

  return [exhibitionLoading, exhibitions];
};
