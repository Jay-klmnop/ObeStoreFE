import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { ButtonBase } from '@/components/ui';

export function OrderComplete() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status'); // "success" | "fail" | null
  const orderNumber = searchParams.get('orderNumber'); // 주문 번호 (UUID)
  const receiptUrl = searchParams.get('receiptUrl'); // Toss 영수증 URL

  const failCode = searchParams.get('code'); // 실패 시 오류 코드
  const failMessage = searchParams.get('message'); // 실패 시 오류 메시지
  const failOrderId = searchParams.get('orderId'); // 실패 시 Toss에서 넘어온 orderId (있으면)

  const goToMainPage = () => {
    navigate('/');
  };

  // 잘못된 접근 (status 없음)
  if (!status) {
    return (
      <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
        <h2 className='text-2xl font-semibold'>잘못된 접근입니다.</h2>
        <p className='mt-6 text-base text-gray-600'>
          결제 결과 정보가 없습니다. 메인 페이지로 이동해 다시 시도해 주세요.
        </p>
        <div className='mt-10'>
          <ButtonBase variant='filled' onClick={goToMainPage}>
            메인으로 이동
          </ButtonBase>
        </div>
      </div>
    );
  }

  // ✅ 결제 성공 화면
  if (status === 'success') {
    return (
      <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
        <h2 className='text-3xl font-normal'>
          <b className='font-semibold'>주문</b>이 <b className='font-semibold'>완료</b> 되었습니다!
        </h2>

        <div className='mt-8 flex w-full justify-between'>
          <span className='font-medium lg:w-[90px]'>주문 번호</span>
          <span className='text-right break-all'>{orderNumber ?? '주문번호 정보 없음'}</span>
        </div>

        <div className='border-custom-gray-50 mt-7 flex w-full justify-between border-t pt-7'>
          <span className='font-medium lg:w-[90px]'>영수증</span>
          <div className='flex flex-col items-end text-right'>
            {receiptUrl ? (
              <a href={receiptUrl} target='_blank' rel='noreferrer' className='text-sm underline'>
                Toss 영수증 확인하기
              </a>
            ) : (
              <span className='text-sm text-gray-500'>영수증 링크가 제공되지 않았습니다.</span>
            )}
          </div>
        </div>

        <div className='mt-10 flex gap-3'>
          <ButtonBase variant='hollow'>
            <Link to='/users/orderinfo'>주문 상세 보기</Link>
          </ButtonBase>
          <ButtonBase variant='filled' onClick={goToMainPage}>
            메인으로 이동
          </ButtonBase>
        </div>

        <p className='text-custom-gray-100 mt-5 cursor-default text-center text-base font-light'>
          주문내역 및 배송에 관한 안내는 <b>[주문 상세 보기]</b>를 통해 다시 확인하실 수 있습니다.
        </p>
      </div>
    );
  }

  // ❌ 결제 실패 화면
  if (status === 'fail') {
    return (
      <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
        <h2 className='text-3xl font-normal'>
          <b className='font-semibold'>결제</b>가 <b className='font-semibold'>실패</b>했습니다.
        </h2>

        <div className='mt-8 w-full rounded-xl bg-gray-50 p-5 text-base'>
          <p className='mb-2 font-semibold'>사유</p>
          <p className='text-red-600'>{failMessage || '알 수 없는 사유로 결제가 실패했습니다.'}</p>
          {failCode && (
            <p className='mt-2 text-sm text-gray-500'>
              오류 코드: <span className='font-mono'>{failCode}</span>
            </p>
          )}
          {failOrderId && (
            <p className='mt-1 text-sm text-gray-500'>
              주문 식별값: <span className='font-mono'>{failOrderId}</span>
            </p>
          )}
        </div>

        <div className='mt-10 flex gap-3'>
          <ButtonBase variant='hollow' onClick={() => navigate(-1)}>
            이전 페이지로
          </ButtonBase>
          <ButtonBase variant='filled' onClick={goToMainPage}>
            메인으로 이동
          </ButtonBase>
        </div>

        <p className='text-custom-gray-100 mt-5 cursor-default text-center text-base font-light'>
          동일한 문제가 반복된다면 고객센터로 문의해 주세요.
        </p>
      </div>
    );
  }

  // status는 있는데 success/fail 둘 다 아닌 경우
  return (
    <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
      <h2 className='text-2xl font-semibold'>알 수 없는 결제 상태입니다.</h2>
      <p className='mt-6 text-base text-gray-600'>
        결제 결과를 확인할 수 없습니다. 메인 페이지에서 다시 시도해 주세요.
      </p>
      <div className='mt-10'>
        <ButtonBase variant='filled' onClick={goToMainPage}>
          메인으로 이동
        </ButtonBase>
      </div>
    </div>
  );
}
