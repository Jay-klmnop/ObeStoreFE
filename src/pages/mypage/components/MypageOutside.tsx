import type { ReactNode } from 'react';

type MypageOutsideProps = {
  children: ReactNode;
};

export default function MypageOutside({ children }: MypageOutsideProps) {
  return (
    <section className='w-full px-3.5 py-4.5'>
      <div className='m-auto flex w-full min-w-[360px] grow flex-col lg:max-w-[1200px] lg:flex-row'>
        {children}
      </div>
    </section>
  );
}
