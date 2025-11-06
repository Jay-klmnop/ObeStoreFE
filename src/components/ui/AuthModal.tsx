import type { ReactNode, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export function AuthModal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className='centralize modal fixed inset-0 z-100 h-3/5' onClick={handleBackdropClick}>
      <div className='relative w-full max-w-md rounded-lg p-4'>
        <div className='flex items-start justify-between'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <button onClick={onClose} className='text-2xl font-light'>
            &times;
          </button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
}

export default AuthModal;
