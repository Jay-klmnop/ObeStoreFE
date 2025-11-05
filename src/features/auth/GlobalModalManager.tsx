import { useAuthStore, LoginModal, SignupForm } from '@/features/auth';

const GlobalModalManager = () => {
  const { authModalType } = useAuthStore();

  return (
    <>
      {authModalType === 'login' && <LoginModal />}
      {authModalType === 'signup' && <SignupForm />}
    </>
  );
};

export default GlobalModalManager;
