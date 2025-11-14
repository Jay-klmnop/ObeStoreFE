import type { ReactNode } from 'react';

type MypageOutsideProps = {
  children: ReactNode;
};

export function MypageOutside({ children }: MypageOutsideProps) {
  return (
    <section className='w-full'>
      <div className='grow flex-col lg:flex-row'>{children}</div>
    </section>
  );
}
