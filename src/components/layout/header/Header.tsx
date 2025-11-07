import { HeaderLogoIcon, MenuIcon } from '@/components/icon';
import { HeaderIcons, HeaderNav } from '@/components/layout';
import { AuthButton } from '@/features/auth';
import { SearchModal } from '@/features/search';

export function Header() {
  return (
    <header className='fixed top-0 z-100 flex w-full justify-center bg-white'>
      <div className='bg-primary-100 flex h-16 max-w-[1200px] min-w-[360px] grow items-center justify-between px-8'>
        <div className='flex gap-8'>
          <MenuIcon className='md:hidden' />
          <HeaderLogoIcon width={48} />
          <HeaderNav />
        </div>
        <div className='flex h-9 gap-8'>
          <HeaderIcons />
          <SearchModal />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
