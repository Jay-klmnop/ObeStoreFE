import { ButtonBase } from '@/components/ui';
import { useModalStore } from '@/store';
import type { ProductDetailType } from '@/types';

interface ReviewButtonProps {
  product: ProductDetailType;
}

export function ReviewButton({ product }: ReviewButtonProps) {
  const { openModal } = useModalStore();

  const handleOpenReviewModal = () => {
    openModal('review', { product: product });
  };

  return (
    <ButtonBase variant='gnb' className='py-1' onClick={handleOpenReviewModal}>
      리뷰 작성
    </ButtonBase>
  );
}
