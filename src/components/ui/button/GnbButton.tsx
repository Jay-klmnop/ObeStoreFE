import type { ButtonProps } from '@/components/types';

export function GnbButton({ label, fullWidth = false, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`btn btn-primary-hollow text-primary-700 hover:bg-primary-700/10 rounded-lg px-2 py-2 font-medium transition ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {label}
    </button>
  );
}
