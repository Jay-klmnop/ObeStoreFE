import LogoImgImage from '../../../dist/assets/logo-img.svg';
import type { LogoProps } from '@/components/types/type';

export function HeaderLogoImgIcon({ width, height, className }: LogoProps) {
  return (
    <img
      src={LogoImgImage}
      alt='OBE STORE Logo'
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
