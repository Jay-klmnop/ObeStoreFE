import { useState } from 'react';
import { useAuthStore } from '@/features/auth';
import { AuthModal, ButtonBase } from '@/components/ui';
import naverIcon from '@/assets/naver-icon.svg';
import { HeaderLogoImgIcon } from '@/components/icon';

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
      <div className='flex w-full justify-center'>
        <HeaderLogoImgIcon />
      </div>
      <form onSubmit={handleLogin} className='flex w-full flex-col gap-6'>
        <div className='flex w-full flex-col gap-2'>
          <div>
            <label htmlFor='email' className='text-sm font-semibold'>
              이메일
            </label>
            <input
              id='email'
              value={email}
              type='email'
              placeholder='이메일을 입력해주세요'
              onChange={(e) => setEmail(e.target.value)}
              required
              className='input'
            />
          </div>
          <div>
            <label htmlFor='password' className='text-sm font-semibold'>
              비밀번호
            </label>
            <input
              id='password'
              value={password}
              type='password'
              placeholder='비밀번호를 입력해주세요'
              onChange={(e) => setPassword(e.target.value)}
              required
              className='input'
            />
          </div>
        </div>
        {error && <p className='text-secondary-300 text-sm'>{error}</p>}
        <div className='flex w-full flex-col gap-6'>
          <ButtonBase className='auth-button' variant='filled'>
            로그인
          </ButtonBase>
          <ButtonBase
            className='auth-button flex items-center justify-center gap-2'
            variant='hollow'
          >
            <img src={naverIcon} alt='Naver' className='h-10 w-10' />
            네이버 간편 로그인
          </ButtonBase>
        </div>
      </form>
      <div className='sub-text flex justify-center gap-2'>
        계정이 없으신가요?{' '}
        <button className='text-primary-700 font-bold' onClick={() => openAuthModal('signup')}>
          회원가입
        </button>
      </div>
    </AuthModal>
  );
}
