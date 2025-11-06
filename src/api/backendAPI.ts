import axios from 'axios';
import { API_ENDPOINTS } from '@/api';

export const backendAPI = axios.create({
  baseURL: 'dk yet', // 추후에 백엔드에게 주소 받아와야함
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

backendAPI.interceptors.request.use(
  (config) => {
    const storedData = localStorage.getItem('persist:root');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const authData = JSON.parse(parsed.auth || '{}');
      const accessToken = authData.token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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
        const storedData = localStorage.getItem('persist:root');
        if (!storedData) throw new Error('no persisted data');
        const parsed = JSON.parse(storedData);
        const authData = JSON.parse(parsed.auth || '{}');
        const refreshToken = authData.refresh_token;
        if (!refreshToken) throw new Error('no refresh token');
        const res = await axios.post(
          `${backendAPI.defaults.baseURL}${API_ENDPOINTS.REFRESH_TOKEN}`,
          { refresh: refreshToken }
        );
        const newAccessToken = res.data?.accessToken;
        if (newAccessToken) {
          authData.token = newAccessToken;
          parsed.auth = JSON.stringify(authData);
          localStorage.setItem('persist:root', JSON.stringify(parsed));

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return backendAPI(originalRequest);
        }
      } catch (err) {
        console.error('Token refresh failed: ', err);
        localStorage.clear();
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default backendAPI;
