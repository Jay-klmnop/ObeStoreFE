import {
  FacebookIcon,
  InstagramIcon,
  ThreadsIcon,
  TiktokIcon,
  TwitterIcon,
} from '@/components/icon';
import type { IconProps } from '@/components/types/props';
import type { JSX } from 'react';
import { BrandInfo } from './BrandInfo';

type socialLink = {
  name: string;
  href: string;
  Icon: ({ size, color, className }: IconProps) => JSX.Element;
}[];

export function Footer() {
  const socialLink: socialLink = [
    {
      name: 'Instagram',
      href: 'http://www.instargram/',
      Icon: InstagramIcon,
    },
    {
      name: 'Facebook',
      href: 'http://www.facebook/',
      Icon: FacebookIcon,
    },
    {
      name: 'hreadsI',
      href: 'http://www.facebook/',
      Icon: ThreadsIcon,
    },
    {
      name: 'Tiktok',
      href: 'http://www.tiktokicon/',
      Icon: TiktokIcon,
    },
    {
      name: 'Twitter',
      href: 'http://www.twitter/',
      Icon: TwitterIcon,
    },
  ];
  return (
    <footer className='bg-(--color-primary-700) px-40 py-33'>
      <BrandInfo />
      <div className='mt-10 flex gap-3'>
        {socialLink.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${link.name} 바로가기`}
          >
            <link.Icon size={24} color='#fff' />
          </a>
        ))}
      </div>
    </footer>
  );
}
