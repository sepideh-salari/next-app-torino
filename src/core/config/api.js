import axios from "axios";
import { getCookie, setCookie } from "src/core/utils/cookies.js";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Helper function to get tokens
const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      { refreshToken }
    );
    return { response };
  } catch {
    return null;
  }
};

// Request Interceptor
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

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401) and retry logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const tokens = await getNewTokens();
      if (error.response?.status === 201) {
        setCookie("accessToken", res?.response?.data?.accessToken, 30);
        return api(originalRequest); // Retry the original request
      } else {
        // Clear invalid tokens if refresh fails
        ["accessToken", "refreshToken"].forEach((token) =>
          setCookie(token, "", 0)
        );
      }
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
