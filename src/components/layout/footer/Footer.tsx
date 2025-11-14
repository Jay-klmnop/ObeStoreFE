import {
  FacebookIcon,
  InstagramIcon,
  ThreadsIcon,
  TiktokIcon,
  TwitterIcon,
} from '@/components/icon';
import type { IconProps } from '@/components/types';
import type { JSX } from 'react';
import { BrandInfo } from '@/components/layout';

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
      name: 'Threads',
      href: 'http://www.threads/',
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
    <footer className='bg-primary-700 container-1200 px-10 py-28 md:px-28 lg:px-40'>
      <BrandInfo />
      <div className='mt-10 flex gap-4'>
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
