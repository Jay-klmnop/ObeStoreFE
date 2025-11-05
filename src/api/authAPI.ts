import { API_ENDPOINTS, backendAPI } from '@/api';

export const login = (data: unknown) => backendAPI.post(API_ENDPOINTS.LOGIN, data);
export const signup = (data: unknown) => backendAPI.post(API_ENDPOINTS.SIGNUP, data);
export const logout = (data: unknown) => backendAPI.post(API_ENDPOINTS.LOGOUT, data);
export const refreshToken = (data: unknown) => backendAPI.post(API_ENDPOINTS.REFRESH_TOKEN, data);
