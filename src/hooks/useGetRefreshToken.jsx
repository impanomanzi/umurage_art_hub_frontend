import settings from "../components/settings.json";
import useAuth from "./useAuth";
function useGetRefreshToken() {
  const refresh = async () => {
    const { setAuth } = useAuth();
    try {
      const resp = await fetch(`${settings.server_domain}}/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAuth(resp.token);
      return resp.token;
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(String(error));
      }
    }
  };
  return refresh;
}

export default useGetRefreshToken;
