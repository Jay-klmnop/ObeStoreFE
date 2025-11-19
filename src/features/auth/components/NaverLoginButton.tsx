import { ButtonBase } from '@/components/ui';
import { naverIcon } from '@/assets';
import { API_ENDPOINTS } from '../api';

export function NaverLoginButton() {
  const NAVER_LOGIN_URL = `${import.meta.env.VITE_FRONT_URL}${API_ENDPOINTS.NAVER_LOGIN}`;

  const handleLogin = () => {
    window.location.href = NAVER_LOGIN_URL;
  };

  return (
    <ButtonBase
      onClick={handleLogin}
      className='auth-button flex items-center justify-center gap-2'
      variant='hollow'
    >
      <img src={naverIcon} alt='Naver' className='h-10 w-10' />
      네이버 간편 로그인
    </ButtonBase>
  );
}
