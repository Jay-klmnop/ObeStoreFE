import { HeaderLogoIcon } from '@/components/icon';
import { HeaderIcons, HeaderNav } from '@/components/layout';

export function Header() {
  return (
    <header>
      <HeaderLogoIcon />
      <HeaderNav />
      <HeaderIcons />
    </header>
  );
}
