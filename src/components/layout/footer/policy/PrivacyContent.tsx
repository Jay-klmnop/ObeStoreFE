export function PrivacyContent() {
  return (
    <>
      <h2 className='mb-2 text-lg font-semibold'>개인정보처리방침</h2>
      <p className='mt-1 text-sm text-slate-500'>시행일: 2025-11-03</p>

      <section className='mt-8 space-y-6 leading-7'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>1. 수집 및 이용 목적</h2>
          <ul className='mt-2 list-disc space-y-1 pl-6'>
            <li>회원가입 및 본인확인</li>
            <li>주문·결제 처리 및 배송</li>
            <li>고객 상담 및 민원 처리</li>
            <li>서비스 개선 및 마케팅 활용(선택 동의 시)</li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>2. 수집 항목</h2>
          <ul className='mt-2 list-disc space-y-1 pl-6'>
            <li>필수: 이름, 아이디, 비밀번호, 이메일, 연락처, 주소, 결제정보</li>
            <li>선택: 생년월일, 성별, 관심 카테고리</li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>3. 보유 및 이용기간</h2>
          <ul className='mt-2 list-disc space-y-1 pl-6'>
            <li>회원 탈퇴 시 지체 없이 파기</li>
            <li>
              전자상거래법 등 관련 법령에 따라 보관: 계약/청약철회 5년, 결제/공급 5년, 분쟁처리 3년
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>4. 제3자 제공</h2>
          <p className='mt-2'>
            원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 법령에 따른 요청 또는
            이용자의 동의가 있는 경우, 그리고 서비스 수행(배송·결제)에 필요한 범위 내에서 제공할 수
            있습니다.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>5. 처리위탁</h2>
          <div className='mt-2 overflow-x-auto'>
            <table className='min-w-full border border-slate-200 text-left text-sm'>
              <thead className='bg-slate-50 text-slate-700'>
                <tr>
                  <th className='border-b border-slate-200 px-3 py-2'>수탁업체</th>
                  <th className='border-b border-slate-200 px-3 py-2'>위탁업무</th>
                  <th className='border-b border-slate-200 px-3 py-2'>보유·이용기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='border-t border-slate-200 px-3 py-2'>CJ대한통운</td>
                  <td className='border-t border-slate-200 px-3 py-2'>상품 배송</td>
                  <td className='border-t border-slate-200 px-3 py-2'>위탁 목적 달성 시까지</td>
                </tr>
                <tr className='bg-slate-50/60'>
                  <td className='border-t border-slate-200 px-3 py-2'>KG이니시스</td>
                  <td className='border-t border-slate-200 px-3 py-2'>결제 처리</td>
                  <td className='border-t border-slate-200 px-3 py-2'>위탁 목적 달성 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>6. 이용자 권리</h2>
          <p className='mt-2'>
            이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제 및 처리정지를 요청할 수 있으며,
            회원탈퇴를 통해 개인정보의 삭제를 요구할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>7. 개인정보 보호책임자</h2>
          <ul className='mt-2 list-disc space-y-1 pl-6'>
            <li>이름: 김민지</li>
            <li>이메일: privacy@obestor.com</li>
            <li>연락처: 02-1234-5678</li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>8. 고지의 의무</h2>
          <p className='mt-2'>
            본 방침은 2025-11-03부터 시행합니다. 내용 추가·변경 시 웹사이트 공지사항을 통해 사전
            안내합니다.
          </p>
        </div>
      </section>
    </>
  );
}
