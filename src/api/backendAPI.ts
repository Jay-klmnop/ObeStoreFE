import axios from 'axios';
import { API_ENDPOINTS, useAuthStore } from '@/features/auth';

export const backendAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

backendAPI.interceptors.request.use(
  (config) => {
    const access = useAuthStore.getState().access;
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

backendAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${backendAPI.defaults.baseURL}${API_ENDPOINTS.REFRESH_TOKEN}`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data?.access;
        if (newAccessToken) {
          useAuthStore.getState().setToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return backendAPI(originalRequest);
        }
      } catch (err) {
        console.error('Token refresh failed: ', err);
        useAuthStore.getState().logout(() => {
          window.location.href = '/';
        });
      }
    }
    return Promise.reject(error);
  }
);

export default backendAPI;
