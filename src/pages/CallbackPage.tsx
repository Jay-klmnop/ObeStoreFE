import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth';

export function CallbackPage() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get('access');
    const user = params.get('user');

    if (!access || !user) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
      return;
    }

    setToken(access);
    if (user) setUser(JSON.parse(user));
    alert('로그인 완료!');
    navigate('/');
  }, []);

  return null;
}
