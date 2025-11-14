import { ButtonBase } from '@/components/ui';
import { useAuthStore } from '@/features/auth';

export function AuthButton() {
  const { accessToken, openAuthModal } = useAuthStore();

  if (accessToken) return null;

  return (
    <ButtonBase onClick={() => openAuthModal('login')} className='hidden lg:flex' variant='gnb'>
      로그인/회원가입
    </ButtonBase>
  );
}
