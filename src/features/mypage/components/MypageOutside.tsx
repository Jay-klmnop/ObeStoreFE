import type { ReactNode } from 'react';

type MypageOutsideProps = {
  children: ReactNode;
};

export default function MypageOutside({ children }: MypageOutsideProps) {
  return (
    <section className='w-full px-3.5 py-4.5 lg:w-[calc(100%-230px)]'>
      <div className='grow flex-col lg:flex-row'>{children}</div>
    </section>
  );
}
