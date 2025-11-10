import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from '@/components/types';

export function ButtonBase({
  children,
  variant = 'filled',
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  const baseStyle = 'rounded-lg font-medium transition px-4 py-2 btn';

  const variantStyle = {
    filled: 'btn-primary',
    hollow: 'btn-primary-hollow text-primary-700 hover:bg-primary-700/10',
    gnb: 'btn-primary-hollow hover:bg-primary-700/10 font-bold px-2',
  }[variant];

  const merged = twMerge(clsx(baseStyle, variantStyle, fullWidth && 'w-full', className));

  return (
    <button {...rest} className={merged}>
      {children}
    </button>
  );
}
