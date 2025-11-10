import type { ButtonProps } from '@/components/types';
import { ButtonBase } from '@/components/ui/button/ButtonBase';
export const GnbButton = (props: Omit<ButtonProps, 'variant'>) => (
  <ButtonBase {...props} variant='gnb' />
);
