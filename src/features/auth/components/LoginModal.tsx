import { useState } from 'react';
import { NaverLoginButton, useAuthStore } from '@/features/auth';
import { ModalWrapper, ButtonBase } from '@/components/ui';
import { HeaderLogoImgIcon } from '@/components/icon';
import { useModalStore } from '@/store';

export function LoginModal() {
  const { login } = useAuthStore();
  const { openModal, closeModal, modalType } = useModalStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      closeModal();
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인 실패. 다시 시도해주세요.');
    }
  };

  return (
    <ModalWrapper isOpen={modalType === 'login'} onClose={closeModal} title='로그인'>
      <div className='flex w-full justify-center'>
        <HeaderLogoImgIcon width={160} height={160} />
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
              className='auth-input'
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
              className='auth-input'
            />
          </div>
        </div>
        {error && <p className='text-secondary-300 text-sm'>{error}</p>}
        <div className='flex w-full flex-col gap-6'>
          <ButtonBase className='auth-button' variant='filled' type='submit'>
            로그인
          </ButtonBase>
          <NaverLoginButton />
        </div>
      </form>
      <div className='sub-text flex justify-center gap-2'>
        계정이 없으신가요?{' '}
        <button className='text-primary-700 font-bold' onClick={() => openModal('signup')}>
          회원가입
        </button>
      </div>
    </ModalWrapper>
  );
}
