import { Outlet } from 'react-router-dom';
import { Footer, Header } from '@/components/layout';

export function Layout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='grow p-4'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
