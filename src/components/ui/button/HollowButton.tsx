import type { ButtonProps } from '@/components/types';

export function HollowButton({
  children,
  fullWidth = false,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`btn btn-primary-hollow text-primary-700) hover:bg-primary-700)/10 rounded-lg px-4 py-2 font-medium transition ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
}
