import { useAddressModalStore } from '@/store/useAddressModalStore';
import { AddressForm } from './AddressForm';

export function AddressModal() {
  const { isOpen, closeModal } = useAddressModalStore();

  if (!isOpen) return null;

  return (
    <div
      className={`centralize bg-primary-700/50 fixed inset-0 z-100 h-full w-full backdrop-blur-sm`}
    >
      <div className='w-[500px] rounded-lg bg-white p-6'>
        <div className='mb-4 flex items-center justify-between border-b pb-2'>
          <h2 className='text-lg font-bold'>배송지 추가</h2>
          <button className='text-3xl font-light' aria-label='닫기' onClick={closeModal}>
            &times;
          </button>
        </div>
        <AddressForm />
      </div>
    </div>
  );
}
