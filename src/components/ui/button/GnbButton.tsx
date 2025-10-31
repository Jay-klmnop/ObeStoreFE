import type { ButtonProps } from '@/components/types/button';

export function GnbButton({ label, fullWidth = false, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`btn btn-primary-hollow rounded-lg px-2 py-2 font-medium text-(--color-primary-700) transition hover:bg-(--color-primary-700)/10 ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {label}
    </button>
  );
}
