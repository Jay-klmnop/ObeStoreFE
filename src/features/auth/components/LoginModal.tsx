import { useState } from 'react';
import { useAuthStore } from '@/features/auth';
import { AuthModal } from '@/components/ui';
import { EmailInput, PasswordInput } from '@/components/ui';

export function LoginModal() {
  const { login, openAuthModal, closeAuthModal, authModalType } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      closeAuthModal();
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <AuthModal isOpen={authModalType === 'login'} onClose={closeAuthModal} title='로그인'>
      <form onSubmit={handleLogin}>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className='text-secondary-300 text-sm'>{error}</p>}
        <button>로그인</button>
        <div>
          계정이 없으신가요? <button onClick={() => openAuthModal('signup')}>회원가입</button>
        </div>
      </form>
    </AuthModal>
  );
}
