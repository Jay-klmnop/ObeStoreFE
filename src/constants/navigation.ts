import type { ComponentType } from 'react';
import type { IconProps } from '@/components/types';
import { SearchToggleButton } from '@/features/search';
import { ProfileIcon, CartIcon, EmptyHeartIcon } from '@/components/icon';

export const HEADER_NAV_LINKS = [
  { href: '/products', label: 'OBJETS' },
  { href: '/products?category=fashion', label: 'FASHION' },
  { href: '/products?category=living', label: 'LIVING' },
  { href: '/about', label: 'ABOUT' },
];

export type HeaderIconLinkType =
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

export const HEADER_ICONS_LINKS: HeaderIconLinkType[] = [
  {
    type: 'action',
    action: 'openSearchModal',
    label: 'SEARCH',
    Icon: SearchToggleButton,
    responsiveClass: 'mobile-visible',
  },
  {
    type: 'link',
    href: '/users',
    label: 'MYPAGE',
    Icon: ProfileIcon,
    responsiveClass: 'mobile-visible',
  },
  {
    type: 'link',
    href: '/users/favorites',
    label: 'FAVORITES',
    Icon: EmptyHeartIcon,
    responsiveClass: 'mobile-hidden',
  },
  {
    type: 'link',
    href: '/users/cart',
    label: 'CART',
    Icon: CartIcon,
    responsiveClass: 'mobile-hidden',
  },
];

export const MYPAGE_NAV_LINKS = [
  {
    type: 'link',
    href: '/orders',
    label: '주문 내역',
  },
  {
    type: 'link',
    href: '/users/me',
    label: '나의 정보 조회/수정',
  },
  {
    type: 'link',
    href: '/users/me', // 확실하지 않아서 확인해야함
    label: '배송지 정보 조회/수정',
  },
  {
    type: 'action',
    action: 'toggleSignout',
    label: '로그아웃',
  },
];
