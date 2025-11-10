import { useAuthStore } from '@/features/auth';
import { AuthModal, ButtonBase } from '@/components/ui';
import { HeaderLogoImgIcon } from '@/components/icon';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다'),
    username: z.string().min(2, '이름은 2자 이상 입력해주세요'),
    nickname: z.string().min(2, '닉네임은 2자 이상 입력해주세요'),
    phone: z.string().regex(/^010-\d{4}-\d{4}$/, '형식: 010-1234-5678'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .regex(/[A-Z]/, '대문자를 포함해야 합니다')
      .regex(/[a-z]/, '소문자를 포함해야 합니다')
      .regex(/[0-9]/, '숫자를 포함해야 합니다')
      .regex(/[^A-Za-z0-9]/, '특수문자를 포함해야 합니다'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const { signup, openAuthModal, closeAuthModal, authModalType } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup(data.email, data.password);
      closeAuthModal();
    } catch (err: any) {
      console.error('회원가입 실패:', err);
      alert(err.response?.data?.message || '회원가입 실패. 다시 시도해주세요.');
    }
  };

  return (
    <AuthModal isOpen={authModalType === 'signup'} onClose={closeAuthModal} title='회원가입'>
      <div className='mt-40 flex w-full justify-center'>
        <HeaderLogoImgIcon />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex w-full flex-col gap-6'>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-sm font-semibold'>
              이메일
            </label>
            <div className='flex gap-2'>
              <input
                id='email'
                type='email'
                placeholder='이메일을 입력해주세요'
                {...register('email')}
                required
                className='input auth-input'
              />
              <ButtonBase type='button' className='grow' variant='filled'>
                중복확인
              </ButtonBase>
            </div>
            {errors.email && <p className='text-secondary-300 text-sm'>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor='username' className='text-sm font-semibold'>
              사용자명
            </label>
            <input
              id='username'
              type='username'
              placeholder='사용자명을 입력해주세요'
              {...register('username')}
              required
              className='input'
            />
            {errors.username && (
              <p className='text-secondary-300 text-sm'>{errors.username.message}</p>
            )}
          </div>

          <div className='flex flex-col'>
            <label htmlFor='nickname' className='text-sm font-semibold'>
              닉네임
            </label>
            <div className='flex gap-2'>
              <input
                id='nickname'
                type='nickname'
                placeholder='닉네임을 입력해주세요'
                {...register('nickname')}
                required
                className='input auth-input'
              />
              <ButtonBase type='button' className='grow' variant='filled'>
                중복확인
              </ButtonBase>
            </div>
            {errors.nickname && (
              <p className='text-secondary-300 text-sm'>{errors.nickname.message}</p>
            )}
          </div>

          <div>
            <label htmlFor='phone' className='text-sm font-semibold'>
              전화번호
            </label>
            <input
              id='phone'
              type='phone'
              placeholder='전화번호를 입력해주세요 (010-XXXX-XXXX)'
              {...register('phone')}
              required
              className='input'
            />
            {errors.phone && <p className='text-secondary-300 text-sm'>{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor='password' className='text-sm font-semibold'>
              비밀번호
            </label>
            <input
              id='password'
              type='password'
              placeholder='비밀번호를 입력해주세요'
              {...register('password')}
              required
              className='input'
            />
            {errors.password && (
              <p className='text-secondary-300 text-sm'>{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor='confirmPassword' className='text-sm font-semibold'>
              비밀번호 확인
            </label>
            <input
              id='confirmPassword'
              type='password'
              placeholder='비밀번호를 입력해주세요'
              {...register('confirmPassword')}
              required
              className='input'
            />
            {errors.confirmPassword && (
              <p className='text-secondary-300 text-sm'>{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div className='flex w-full flex-col gap-6'>
          <ButtonBase
            type='submit'
            className='auth-button'
            disabled={isSubmitting}
            variant='filled'
          >
            {isSubmitting ? '회원가입 중...' : '회원가입'}
          </ButtonBase>
        </div>
      </form>
      <div className='sub-text flex justify-center gap-2'>
        이미 계정이 있으신가요?{' '}
        <button className='text-primary-700 font-bold' onClick={() => openAuthModal('login')}>
          로그인
        </button>
      </div>
    </AuthModal>
  );
}
