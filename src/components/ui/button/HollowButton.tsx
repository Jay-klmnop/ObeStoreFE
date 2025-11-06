import type { ButtonProps } from '@/components/types';

export function HollowButton({ label, fullWidth = false, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`btn btn-primary-hollow text-color-primary-700 hover:bg-color-primary-700/10 rounded-lg px-4 py-2 font-medium transition ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {label}
    </button>
  );
}
