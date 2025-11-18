import { ButtonBase } from '@/components/ui';
import { useAuthStore } from '@/features/auth';
import { useModalStore } from '@/store';

export function AuthButton() {
  const { accessToken } = useAuthStore();
  const { openModal } = useModalStore();

  if (accessToken) return null;

  return (
    <ButtonBase onClick={() => openModal('login')} className='hidden lg:flex' variant='gnb'>
      로그인/회원가입
    </ButtonBase>
  );
}
