import type { ComponentType } from 'react';
import type { IconProps } from '@/components/types';
import { SearchIcon, ProfileIcon, HeartIcon, CartIcon } from '@/components/icon';

export const HEADER_NAV_LINKS = [
  { href: '/products?category=fashion', label: 'FASHION' },
  { href: '/products?category=living', label: 'LIVING' },
  { href: '/about', label: 'ABOUT' },
];

type HeaderIconLink =
  | {
      type: 'action';
      action: string;
      label: string;
      Icon: ComponentType<IconProps>;
      responsiveClass?: string;
    }
  | {
      type: 'link';
      href: string;
      label: string;
      Icon: ComponentType<IconProps>;
      responsiveClass?: string;
    };

export const HEADER_ICONS_LINKS: HeaderIconLink[] = [
  {
    type: 'action',
    action: 'toggleSearch',
    label: 'search',
    Icon: SearchIcon,
    responsiveClass: 'mobile-visible',
  },
  {
    type: 'link',
    href: '/mypage',
    label: 'My Page',
    Icon: ProfileIcon,
    responsiveClass: 'mobile-visible',
  },
  {
    type: 'link',
    href: '/mypage/favorites',
    label: 'Favorites',
    Icon: HeartIcon,
    responsiveClass: 'mobile-hidden',
  },
  {
    type: 'link',
    href: '/mypage/cart',
    label: 'Cart',
    Icon: CartIcon,
    responsiveClass: 'mobile-hidden',
  },
];
