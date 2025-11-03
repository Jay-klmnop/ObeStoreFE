import type { ButtonProps } from '@/components/types';

export function FilledButton({
  label,
  variant = 'filled',
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  const baseStyle =
    variant === 'filled'
      ? 'btn btn-primary rounded-lg font-medium transition px-4 py-2'
      : 'btn btn-primary rounded-lg font-medium transition px-4 py-2';

  return (
    <button {...rest} className={`${baseStyle} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label}
    </button>
  );
}
