import LogoFooterImage from '@/assets/logo-footer.svg';
import type { LogoProps } from '@/components/types';

export function FooterLogoIcon({ width, height, className }: LogoProps) {
  return (
    <img
      src={LogoFooterImage}
      alt='OBE STORE Logo'
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
