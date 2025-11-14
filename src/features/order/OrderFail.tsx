import { useSearchParams, Link } from 'react-router-dom';

export function OrderFail() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code') || 'UNKNOWN_ERROR';
  const message = searchParams.get('message') || '결제에 실패했습니다.';

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
      <h2 className='text-3xl font-semibold text-red-600'>결제 실패</h2>

      <div className='mt-8 w-full rounded-lg bg-red-50 p-5 text-base text-red-700'>
        <p>
          <b>에러 코드:</b> {code}
        </p>
        <p className='mt-1'>
          <b>실패 사유:</b> {message}
        </p>
      </div>

      <div className='mt-10 flex gap-4'>
        <Link to='/cart' className='rounded-lg border px-4 py-2 text-base text-black'>
          다시 결제하러 가기
        </Link>

        <Link to='/' className='rounded-lg bg-black px-4 py-2 text-base text-white'>
          메인으로 이동
        </Link>
      </div>

      <p className='text-custom-gray-100 mt-5 text-sm'>문제가 계속되면 고객센터로 문의해주세요.</p>
    </div>
  );
}
