import { useState } from 'react';
import { useAuthStore } from '@/features/auth';
import { AuthModal } from '@/components/ui';
import { EmailInput, PasswordInput } from '@/components/ui';

export function SignupForm() {
  const { signup, openAuthModal, closeAuthModal, authModalType } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password);
      closeAuthModal();
    } catch (err: any) {
      setError(err.response?.data?.message || '회원가입 실패. 다시 시도해주세요.');
    }
  };

  return (
    <AuthModal isOpen={authModalType === 'signup'} onClose={closeAuthModal} title='회원가입입'>
      <form onSubmit={handleSignup}>
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className='text-secondary-300 text-sm'>{error}</p>}
        <button>회원가입</button>
        <div>
          이미 계정이 있으신가요? <button onClick={() => openAuthModal('login')}>로그인</button>
        </div>
      </form>
    </AuthModal>
  );
}
