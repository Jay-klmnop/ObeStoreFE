import { ButtonBase } from '@/components/ui';
import { naverIcon } from '@/assets';

export function NaverLoginButton() {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const REDIRECT_URI = `${import.meta.env.VITE_FRONT_URL}/auth/naver/callback`;
  const STATE = crypto.randomUUID();

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}`;

  const handleLogin = () => {
    window.location.href = NAVER_AUTH_URL;
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
