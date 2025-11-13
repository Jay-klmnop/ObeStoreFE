import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendAPI } from '@/api';
import { useAuthStore } from '@/features/auth';

export function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');

      if (!code || !state) {
        alert('로그인 실패');
        return navigate('/');
      }

      try {
        const res = await backendAPI.post('/auth/naver/callback', { code, state });
        const { accessToken } = res.data;

        useAuthStore.getState().setToken(accessToken);
        navigate('/');
      } catch (err) {
        console.error('네이버 로그인 실패:', err);
        alert('네이버 로그인 실패');
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return <p>네이버 로그인 처리 중...</p>;
}
