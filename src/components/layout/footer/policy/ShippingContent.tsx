export function ShippingContent() {
  return (
    <>
      <h2 className='mb-2 text-lg font-semibold'>배송 및 반품 안내</h2>
      <p className='mt-1 text-sm text-slate-500'>시행일: 2025-11-03</p>

      <section className='mt-8 space-y-6 leading-7'>
        {/* 배송 안내 */}
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>배송 안내</h2>
          <ul className='mt-3 list-disc space-y-1 pl-6'>
            <li>
              <span className='font-medium'>배송사:</span> CJ대한통운 (택배사 변경 가능, 변경 시
              공지)
            </li>
            <li>
              <span className='font-medium'>배송비:</span> 3,000원 (5만원 이상 구매 시 무료배송)
            </li>
            <li>
              <span className='font-medium'>배송기간:</span> 결제 완료 후 1~3영업일 이내 출고, 출고
              후 1~2일 소요 (도서산간 지역은 2~3일 추가 소요)
            </li>
            <li>
              <span className='font-medium'>배송지연:</span> 주문 폭주, 입고 지연, 기상 상황 등에
              따라 배송이 지연될 수 있으며 개별적으로 안내드립니다.
            </li>
          </ul>
        </div>

        {/* 반품 신청 */}
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>반품 신청 안내</h2>
          <ol className='mt-3 list-decimal space-y-1 pl-6'>
            <li>
              상품 수령일로부터 <span className='font-medium'>7일 이내</span> 마이페이지 &gt;
              주문내역에서 반품 신청이 가능합니다.
            </li>
            <li>또는 고객센터(02-1234-5678) / 이메일(support@obestor.com)로 접수 가능합니다.</li>
            <li>
              반품 신청 후 택배 기사 방문 수거 또는 지정 반송 주소로 직접 발송하실 수 있습니다.
            </li>
          </ol>
        </div>

        {/* 반품 비용 */}
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>반품 비용</h2>
          <ul className='mt-3 list-disc space-y-1 pl-6'>
            <li>단순 변심: 왕복 6,000원 (초기 무료배송 포함 시 왕복 부과)</li>
            <li>상품 불량 / 오배송: 무료 (OBE-STOR 부담)</li>
          </ul>
        </div>

        {/* 반품 불가 사유 */}
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>반품 불가 사유</h2>
          <ul className='mt-3 list-disc space-y-1 pl-6'>
            <li>상품 수령일로부터 7일 이상 경과한 경우</li>
            <li>착용, 세탁, 수선, 오염, 향수 사용 등으로 상품 가치가 훼손된 경우</li>
            <li>액세서리, 리빙용품 등 포장 개봉 시 가치가 감소되는 상품</li>
            <li>세일 / 이벤트 상품 등 별도 반품 불가 안내가 된 상품</li>
          </ul>
        </div>

        {/* 환불 안내 */}
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>환불 안내</h2>
          <ul className='mt-3 list-disc space-y-1 pl-6'>
            <li>
              반품 상품 회수 및 검수 완료 후 <span className='font-medium'>3영업일 이내</span> 환불
              처리됩니다.
            </li>
            <li>카드 결제: 카드사 영업일 기준 3~5일 소요</li>
            <li>계좌 이체: 환불 요청 후 2영업일 내 처리</li>
          </ul>
        </div>
      </section>
    </>
  );
}
