import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, useAuthStore } from '@/features/auth';
import axios from 'axios';
import { useModalStore } from '@/store';

export function CallbackPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const closeModal = useModalStore((s) => s.closeModal);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code || !state) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}${API_ENDPOINTS.NAVER_LOGIN}`, {
        params: { code, state },
        withCredentials: true,
      })
      .then((res) => {
        const { access, user } = res.data;
        setToken(access);
        setUser(user);
        closeModal();

        alert('로그인 완료!');
        navigate('/');
      })
      .catch((err) => {
        console.error('네이버 로그인 실패:', err);
        alert('로그인 처리 중 오류가 발생했습니다.');
        navigate('/');
      });
  }, []);
  return null;
}
