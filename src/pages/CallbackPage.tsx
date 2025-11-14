import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';
import axios from 'axios';

export function CallbackPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code || !state) {
      alert('로그인 실패');
      navigate('/auth/login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/naver/callback`, {
        params: { code, state },
        withCredentials: true,
      })
      .then((res) => {
        const { accessToken, user } = res.data;
        setToken(accessToken);
        setUser(user);
        navigate('/');
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

  return <p>네이버 로그인 처리 중...</p>;
}
