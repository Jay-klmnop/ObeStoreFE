import { HeaderLogoImgIcon } from '@/components/icon';
import { about } from '@/assets';

export function AboutPage() {
  return (
    <section className='centralize bg-primary-100 flex-col gap-4'>
      <HeaderLogoImgIcon width={160} height={160} className='mt-8' />
      <img src={about} alt='Obe Store Image' className='h-auto w-full min-w-[360px]' />
      <div className='mb-8 flex flex-col text-center text-lg font-light'>
        <p>일상 속에서 천천히 스며드는 물건들</p>
        <p>사용한 사람들의 진짜 이야기들을 담았습니다</p>
      </div>
      <div className='mb-16 flex flex-col text-center font-black'>
        <h2 className='text-3xl'>OBE STORE</h2>
        <p>Just enough, Never too much</p>
      </div>
    </section>
  );
}
