import { backendAPI } from '@/api';
import { API_ENDPOINTS } from '@/features/auth';

export const socialNaverLogin = (data: { code: string; state: string | null }) =>
  backendAPI.post(API_ENDPOINTS.NAVER_LOGIN, data);
