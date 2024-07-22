import { useCallback } from "react";
import useAuth from "./useAuth";
import useGetRefreshToken from "./useGetRefreshToken";

const useFetchWithAuth = () => {
  const { auth } = useAuth();
  const refreshAccessToken = useGetRefreshToken();

  const fetchWithAuth = useCallback(
    async (url, options = {}) => {
      const fetchOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${auth}`,
        },
        credentials: "include",
      };

      console.log("Initial fetch options:", fetchOptions);

      let response = await fetch(url, fetchOptions);
      console.log(response);

      if (response.status === 403) {
        try {
          const newToken = await refreshAccessToken();
          const retryFetchOptions = {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
            credentials: "include",
          };

          response = await fetch(url, retryFetchOptions);
        } catch (error) {
          console.error("Failed to refresh token:", error);
          throw error;
        }
      }

      return response;
    },
    [auth, refreshAccessToken]
  );

  return fetchWithAuth;
};

export default useFetchWithAuth;
