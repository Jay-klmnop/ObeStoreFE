import type { ReactNode, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title: string;
}

export function ModalWrapper({ isOpen, onClose, children, className, title }: ModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`centralize bg-primary-700/50 fixed inset-0 z-100 h-full w-full backdrop-blur-sm ${className ?? ''}`}
      onClick={handleBackdropClick}
    >
      <div
        className='modal modal-wrapper relative m-10 flex h-4/5 w-full flex-col'
        role='dialog'
        aria-modal='true'
      >
        <div className='flex items-start justify-between'>
          <h2 className='mt-2 text-xl font-bold'>{title}</h2>
          <button onClick={onClose} className='text-3xl font-light' aria-label='닫기'>
            &times;
          </button>
        </div>
        <div className='centralize mb-8 h-full flex-col gap-6 overflow-y-auto p-4'>{children}</div>
      </div>
    </div>
  );
}
