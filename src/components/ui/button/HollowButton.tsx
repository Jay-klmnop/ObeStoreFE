import type { ButtonProps } from '@/components/types';
import { ButtonBase } from '@/components/ui/button/ButtonBase';
export const HollowButton = (props: Omit<ButtonProps, 'variant'>) => (
  <ButtonBase {...props} variant='hollow' />
);
