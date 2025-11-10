import type { ReactNode } from 'react';

type MyPageInfoRowProps = {
  rowTitle: string;
  rowContent: ReactNode;
};

export function MyPageInfoRow({ rowTitle, rowContent }: MyPageInfoRowProps) {
  return (
    <>
      <li className='flex items-center justify-items-start gap-5 border-b border-gray-200 py-5 lg:gap-0'>
        <span className='pl-2.5 font-medium sm:w-[30%] md:w-[30%] lg:w-[11.4rem]'>{rowTitle}</span>
        <span className='sm:w-[70%] md:w-[70%] lg:w-[calc(100%-11.4rem)]'>{rowContent}</span>
      </li>
    </>
  );
}
