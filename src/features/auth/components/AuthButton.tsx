import { GnbButton } from '@/components/ui';
import { useAuthStore } from '@/features/auth';

export function AuthButton() {
  const { accessToken, openAuthModal } = useAuthStore();

  if (accessToken) return null;

  return <GnbButton label='로그인/회원가입' onClick={() => openAuthModal('login')} />;
}
