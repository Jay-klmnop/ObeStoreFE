import { useAuthStore, LoginModal, SignupForm } from '@/features/auth';

export function GlobalModalManager() {
  const { authModalType } = useAuthStore();

  return (
    <>
      {authModalType === 'login' && <LoginModal />}
      {authModalType === 'signup' && <SignupForm />}
    </>
  );
}
