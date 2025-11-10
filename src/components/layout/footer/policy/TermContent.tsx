export function TermsContent() {
  return (
    <>
      <h2 className='mb-2 text-lg font-semibold'>이용약관</h2>
      <p className='mt-1 text-sm text-slate-500'>시행일: 2025-11-03</p>

      <section className='mt-8 space-y-6 leading-7'>
        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제1조 (목적)</h2>
          <p className='mt-2'>
            본 약관은 OBE-STOR(이하 “회사”)가 운영하는 온라인 쇼핑몰(이하 “몰”)에서 제공하는 서비스
            이용에 관한 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제2조 (정의)</h2>
          <ol className='mt-2 list-decimal space-y-1 pl-6'>
            <li>
              “몰”이란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 설정한 가상의 영업장을
              말합니다.
            </li>
            <li>
              “이용자”란 몰에 접속하여 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.
            </li>
            <li>
              “회원”이란 몰에 회원등록을 한 자로서, 계속적으로 서비스를 이용할 수 있는 자를
              말합니다.
            </li>
            <li>“비회원”이란 회원가입 없이 서비스를 이용하는 자를 말합니다.</li>
          </ol>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제3조 (약관의 효력 및 변경)</h2>
          <ol className='mt-2 list-decimal space-y-1 pl-6'>
            <li>본 약관은 몰 초기화면 또는 연결화면에 게시함으로써 효력이 발생합니다.</li>
            <li>회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</li>
            <li>
              약관 변경 시 시행 7일 전부터 공지하며, 이용자가 변경에 동의하지 않을 경우 회원탈퇴로
              의사표시를 할 수 있습니다.
            </li>
          </ol>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제4조 (서비스의 제공 및 변경)</h2>
          <ol className='mt-2 list-decimal space-y-1 pl-6'>
            <li>회사는 상품 정보 제공, 구매계약 체결, 배송, 고객지원 등 서비스를 제공합니다.</li>
            <li>
              상품 품절, 기술적 사유 등으로 서비스 내용을 변경할 수 있으며, 이 경우 즉시 공지합니다.
            </li>
          </ol>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제5조 (구매신청 및 계약의 성립)</h2>
          <ol className='mt-2 list-decimal space-y-1 pl-6'>
            <li>이용자는 상품 선택 → 주문서 작성 → 결제 절차로 구매를 신청합니다.</li>
            <li>
              회사의 승낙(주문접수/결제완료 등 전자적 통지)이 이용자에게 도달한 때 계약이
              성립합니다.
            </li>
          </ol>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제6조 (대금결제 방법)</h2>
          <ul className='mt-2 list-disc space-y-1 pl-6'>
            <li>신용/체크카드, 계좌이체, 간편결제(카카오페이, 네이버페이 등)</li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제7조 (회원의 의무)</h2>
          <ul className='mt-2 list-disc space-y-1 pl-6'>
            <li>
              허위 정보 등록, 타인의 정보 도용, 서비스 운영 방해, 지적재산권 침해 행위를 해서는 안
              됩니다.
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제8조 (서비스의 중단)</h2>
          <p className='mt-2'>
            천재지변, 시스템 점검 등 불가항력적인 사유 발생 시 서비스 제공을 일시 중단할 수
            있습니다.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제9조 (책임의 제한)</h2>
          <p className='mt-2'>
            회사은 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-semibold text-slate-900'>제10조 (재판권 및 준거법)</h2>
          <p className='mt-2'>
            본 약관에 따른 분쟁은 대한민국 법률을 따르며, 회사 본사 소재지를 관할하는 법원을 전속
            관할로 합니다.
          </p>
        </div>
      </section>
    </>
  );
}
