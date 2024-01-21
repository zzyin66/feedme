import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          "logout/",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          { headers: { "Content-Type": "application/json" } }
        );
        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        window.location.href = "/login";
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return <></>;
};
