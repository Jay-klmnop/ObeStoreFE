import type { ModalProps } from '../types/type';

export function Modal({ isOpen, closeModal, children, ...rest }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className='tems-center fixed inset-0 z-50 flex justify-center bg-black/40'
        onClick={closeModal}
      >
        <div className='modal relative' onClick={(e) => e.stopPropagation()} {...rest}>
          {children}
          <button
            onClick={closeModal}
            className={`absolute top-3 right-3 text-gray-500 hover:text-gray-800`}
          ></button>
        </div>
      </div>
    </>
  );
}
