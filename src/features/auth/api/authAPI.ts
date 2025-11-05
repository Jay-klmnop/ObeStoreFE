import { API_ENDPOINTS, backendAPI } from '@/features/auth/api';

export const authAPI = {
  login: (data: { email: string; password: string }) => backendAPI.post(API_ENDPOINTS.LOGIN, data),
  signup: (data: { email: string; password: string }) =>
    backendAPI.post(API_ENDPOINTS.SIGNUP, data),
  logout: () => backendAPI.post(API_ENDPOINTS.LOGOUT),
  refreshToken: (data: { refreshToken: string }) =>
    backendAPI.post(API_ENDPOINTS.REFRESH_TOKEN, data),
};
