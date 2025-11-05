import type { ModalProps } from '@/components/types';
import { IoClose } from 'react-icons/io5';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export function Modal({
  isOpen,
  closeModal,
  children,
  buttons,
  onConfirm,
  onCancel,
  size = 'md',
  ...rest
}: ModalProps & { onConfirm?: () => void; onCancel?: () => void; size?: ModalSize }) {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };
  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };
  if (!isOpen) return null;

  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'w-[90%] max-w-none h-[90vh]',
  }[size];

  return (
    <>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
        onClick={closeModal}
      >
        <div
          className={`modal relative w-full rounded-lg bg-white px-7 py-7 shadow-lg ${sizeClass}`}
          onClick={(e) => e.stopPropagation()}
          {...rest}
        >
          {children}
          <button
            onClick={closeModal}
            className={`absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-800`}
          >
            <IoClose color='var(--color-primary-700)' size={24} />
          </button>
          {buttons && (
            <div className='flex items-center justify-center gap-4 pt-5'>
              <button
                onClick={() => handleCancel()}
                className='bg-primary-700 h-11 w-[170px] rounded-lg text-white'
              >
                아니요
              </button>
              <button
                className='border-primary-700 text-primary-700 h-11 w-[170px] rounded-lg border bg-white'
                onClick={() => handleConfirm()}
              >
                네
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
