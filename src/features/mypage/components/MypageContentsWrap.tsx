import type { ReactNode } from 'react';

type MypageContentsWrapProps = {
  children: ReactNode;
};
export function MypageContentsWrap({ children }: MypageContentsWrapProps) {
  return <div className='mt-7.5 w-full lg:mt-15'>{children}</div>;
}
