import { logoImg } from '@/assets';
import type { LogoProps } from '@/components/types';

export function HeaderLogoImgIcon({ width, height, className }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt='OBE STORE Logo'
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
