import { useAddressModalStore } from '@/store';
import { AddressForm, AddressList, ConfirmModal } from '@/components/ui';
import { useAddressMutation, useAddressQuery } from '@/features/mypage/api/useAddressQuery';
import { useEffect } from 'react';

export function AddressModal({ onSelectAddress }: { onSelectAddress?: (addr: any) => void }) {
  const { isOpen, mode, closeModal, editingAddress } = useAddressModalStore();
  const { deleteAddress } = useAddressMutation();
  const { data: addresses = [] } = useAddressQuery();

  const handleDeleteConfirm = () => {
    if (!editingAddress) return;
    deleteAddress.mutate(editingAddress.id, {
      onSuccess: () => closeModal(),
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='centralize bg-primary-700/50 fixed inset-0 z-90 flex h-full w-full items-center justify-center overflow-hidden backdrop-blur-sm'>
      <div
        className={`${mode === 'select' ? 'h-[530px]' : ''} w-[800px] items-center overflow-y-auto rounded-lg bg-white p-6`}
      >
        <div className='mb-4 flex items-center justify-between border-b pb-2'>
          <h2 className='text-lg font-bold'>
            {' '}
            {mode === 'add'
              ? '배송지 추가'
              : mode === 'edit'
                ? '배송지 수정'
                : mode === 'delete'
                  ? '배송지 삭제'
                  : '배송지 선택'}
          </h2>
          <button className='text-3xl font-light' aria-label='닫기' onClick={closeModal}>
            &times;
          </button>
        </div>
        {mode === 'select' ? (
          <AddressList
            addresses={addresses}
            onSelect={(addr) => {
              onSelectAddress?.(addr); //
              closeModal();
            }}
          />
        ) : mode === 'delete' ? (
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
