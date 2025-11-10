import type { ReactNode } from 'react';

type MypageContentsWrapProps = {
  children: ReactNode;
};
export function MypageContentsWrap({ children }: MypageContentsWrapProps) {
  return <div className='mt-7.5 w-full lg:mt-15 lg:ml-7 lg:w-[calc(100%-230px)]'>{children}</div>;
}
