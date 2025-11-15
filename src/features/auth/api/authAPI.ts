import { backendAPI } from '@/api';
import { API_ENDPOINTS } from '@/features/auth';

export const authLogin = (data: { email: string; password: string }) =>
  backendAPI.post(API_ENDPOINTS.LOGIN, data);

export const authSignup = (data: {
  email: string;
  password: string;
  username: string;
  nickname: string;
  phone_number: string;
}) => backendAPI.post(API_ENDPOINTS.SIGNUP, data);

export const authLogout = () => backendAPI.post(API_ENDPOINTS.LOGOUT);

export const authRefreshToken = (data: { refreshToken: string }) =>
  backendAPI.post(API_ENDPOINTS.REFRESH_TOKEN, data);
