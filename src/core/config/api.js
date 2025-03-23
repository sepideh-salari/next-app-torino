import axios from "axios";
import { getCookie, setCookie } from "src/core/utils/cookies.js";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      { refreshToken }
    );
    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch {
    return null;
  }
};

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = await getNewTokens();
      if (tokens && tokens.accessToken) {
        setCookie("accessToken", tokens.accessToken, 30);
        setCookie("refreshToken", tokens.refreshToken, 365);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${tokens.accessToken}`;
        return api(originalRequest);
      } else {
        ["accessToken", "refreshToken"].forEach((token) =>
          setCookie(token, "", 0)
        );
      }
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
