import { useAddressModalStore } from '@/store/useAddressModalStore';
import { AddressForm } from './AddressForm';
import { useAddressMutation } from '@/features/mypage/api/useAddressQuery';
import { ConfirmModal } from './ConfirmModal';

export function AddressModal() {
  const { isOpen, mode, closeModal, editingAddress } = useAddressModalStore();
  const { deleteAddress } = useAddressMutation();
  const handleDeleteConfirm = () => {
    if (!editingAddress) return;
    deleteAddress.mutate(editingAddress.id, {
      onSuccess: () => closeModal(),
    });
  };
  if (!isOpen) return null;

  return (
    <div
      className={`centralize bg-primary-700/50 fixed inset-0 z-100 h-full w-full backdrop-blur-sm`}
    >
      <div className='w-[500px] rounded-lg bg-white p-6'>
        <div className='mb-4 flex items-center justify-between border-b pb-2'>
          <h2 className='text-lg font-bold'>
            {' '}
            {mode === 'add' ? '배송지 추가' : mode === 'edit' ? '배송지 수정' : '배송지 삭제'}
          </h2>
          <button className='text-3xl font-light' aria-label='닫기' onClick={closeModal}>
            &times;
          </button>
        </div>

        {mode === 'delete' ? (
          <ConfirmModal
            isOpen={true}
            closeModal={closeModal}
            onConfirm={handleDeleteConfirm}
            onCancel={closeModal}
            buttons={true}
          >
            <p className='text-center text-gray-700'>
              <strong>{editingAddress?.name}</strong> 배송지를 정말 삭제하시겠습니까?
            </p>
          </ConfirmModal>
        ) : (
          <AddressForm />
        )}
      </div>
    </div>
  );
}
