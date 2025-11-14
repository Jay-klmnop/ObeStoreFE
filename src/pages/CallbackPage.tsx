import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socialNaverLogin } from '@/features/auth';

export function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code || !state) {
      alert('로그인 실패');
      navigate('/');
      return;
    }

    socialNaverLogin({ code, state })
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        alert('네이버 로그인 실패');
        navigate('/login');
      });
  }, []);

  return <p>네이버 로그인 처리 중...</p>;
}
