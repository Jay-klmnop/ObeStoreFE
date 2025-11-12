import { ConfirmModal } from '@/components/ui';
import { useCustomerQuery } from '@/features/order/api/useCustomerQuery';
import { useState } from 'react';
import { useChagePasswordMutation } from '@/features/mypage/api/useChagePasswordMutation';

export function ChangePasswordModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { data: customer } = useCustomerQuery();
  const { mutate: changePassword } = useChagePasswordMutation();

  const handleChangePassword = () => {
    if (!customer) return;

    if (currentPassword !== (customer as any).password) {
      alert('현재 비밀번호가 올바르지 않습니다.');
      return;
    }

    changePassword(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          closeModal();
        },
        onError: (err: any) => {
          alert(err.response?.data?.message || '비밀번호 변경 실패');
        },
      }
    );
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      closeModal={closeModal}
      onConfirm={handleChangePassword}
      onCancel={closeModal}
      buttons={true}
      size='lg'
    >
      <div className='flex flex-col gap-4'>
        <label className='text-sm font-semibold'>현재 비밀번호</label>
        <input
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className='rounded border p-2'
        />
        <label className='text-sm font-semibold'>새 비밀번호</label>
        <input
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='rounded border p-2'
        />
        <label className='text-sm font-semibold'>비밀번호 확인</label>
        <input
          type='password'
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='rounded border p-2'
        />
      </div>
    </ConfirmModal>
  );
}
