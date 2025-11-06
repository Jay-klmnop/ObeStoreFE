import type { ButtonProps } from '@/components/types';

export function GnbButton({ children, fullWidth = false, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`btn btn-primary-hollow hover:bg-primary-700/10 rounded-lg px-2 py-2 font-bold transition ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}
