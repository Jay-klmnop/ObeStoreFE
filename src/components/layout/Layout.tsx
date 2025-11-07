import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/layout';
import { GlobalModalManager } from '@/features/auth';

export function Layout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <GlobalModalManager />
      <main className='grow pt-16'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
