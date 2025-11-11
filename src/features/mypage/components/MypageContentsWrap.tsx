import type { ReactNode } from 'react';

type MypageContentsWrapProps = {
  children: ReactNode;
};
export function MypageContentsWrap({ children }: MypageContentsWrapProps) {
  return <div className='w-full'>{children}</div>;
}
