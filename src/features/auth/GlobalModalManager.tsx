import { LoginModal, SignupForm } from '@/features/auth';
import { useModalStore } from '@/store';
import { ReviewForm } from '@/features/review';

export function GlobalModalManager() {
  const { modalType, modalData } = useModalStore();

  return (
    <>
      {modalType === 'login' && <LoginModal />}
      {modalType === 'signup' && <SignupForm />}
      {modalType === 'review' && modalData?.product && <ReviewForm product={modalData.product} />}
    </>
  );
}
