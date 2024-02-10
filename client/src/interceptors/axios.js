import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/";

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (!refresh) {
        refresh = true; // Prevent multiple refresh attempts

        try {
          const refreshToken = localStorage.getItem("refresh_token");
          const response = await axios.post(
            "token/refresh/",
            {
              refresh: refreshToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access}`;
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            return axios(error.config);
          }
        } catch (refreshError) {
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        window.location.href = "/login";
      }
    }

    refresh = false;
    return Promise.reject(error);
  }
);
