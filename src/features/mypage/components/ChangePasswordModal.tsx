import { ConfirmModal } from '@/components/ui';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '@/features/mypage';
// 📌 SignupForm과 동일한 비밀번호 정책
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(/[A-Z]/, '대문자를 하나 이상 포함해야 합니다.')
      .regex(/[a-z]/, '소문자를 하나 이상 포함해야 합니다.')
      .regex(/[0-9]/, '숫자를 하나 이상 포함해야 합니다.')
      .regex(/[^A-Za-z0-9]/, '특수문자를 하나 이상 포함해야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
type PasswordFormData = z.infer<typeof passwordSchema>;

export function ChangePasswordModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const mutation = useChangePasswordMutation();
  if (!mutation) return null;
  const { mutate: changePassword, isPending } = mutation;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });
  const onSubmit = (data: PasswordFormData) => {
    changePassword(
      { password: data.password },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.');
          reset();
          closeModal();
        },
        onError: (err: any) => {
          alert(err?.response?.data?.message || '비밀번호 변경에 실패했습니다.');
        },
      }
    );
  };
  const handleCancel = () => {
    reset();
    closeModal();
  };
  if (!isOpen) return null;
  return (
    <ConfirmModal
      isOpen={isOpen}
      closeModal={closeModal}
      onConfirm={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      buttons
      size='lg'
      confirmDisabled={isSubmitting || isPending}
    >
      {' '}
      <div className='flex flex-col gap-4'>
        {' '}
        {/* 새 비밀번호 */}{' '}
        <div className='flex flex-col'>
          {' '}
          <label className='text-sm font-semibold'>새 비밀번호</label>{' '}
          <input
            type='password'
            placeholder='8자 이상, 대/소문자+숫자+특수문자 포함'
            {...register('password')}
            className='rounded border p-2'
          />{' '}
          {errors.password && (
            <p className='text-sm text-red-500'>{errors.password.message}</p>
          )}{' '}
        </div>{' '}
        {/* 비밀번호 확인 */}{' '}
        <div className='flex flex-col'>
          {' '}
          <label className='text-sm font-semibold'>비밀번호 확인</label>{' '}
          <input
            type='password'
            placeholder='비밀번호를 다시 입력해주세요'
            {...register('confirmPassword')}
            className='rounded border p-2'
          />{' '}
          {errors.confirmPassword && (
            <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>
          )}{' '}
        </div>{' '}
      </div>{' '}
    </ConfirmModal>
  );
}
