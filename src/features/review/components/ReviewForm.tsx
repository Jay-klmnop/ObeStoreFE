import { REVIEW_KEYWORDS } from '@/constants';
import type { ProductCardType, ProductDetailType } from '@/types';
import { ReviewImageUploadButton, ReviewKeywords, useReviewMutations } from '@/features/review';
import { ButtonBase, ModalWrapper, ReviewRating } from '@/components/ui';
import { useModalStore } from '@/store';
import { useState } from 'react';

interface ReviewFormProps {
  product: ProductCardType | ProductDetailType;
}

export function ReviewForm({ product }: ReviewFormProps) {
  const { closeModal, modalType } = useModalStore();
  const { create: createReview } = useReviewMutations();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<number[]>([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [contentText, setContentText] = useState('');

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    console.log('선택된 파일:', file);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleKeywordIdToggle = (id: number) => {
    setSelectedKeywordIds((prev) =>
      prev.includes(id) ? prev.filter((kId) => kId !== id) : [...prev, id]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (rating === 0) return alert('별점을 선택해주세요!');
    if (selectedKeywordIds.length === 0) return alert('상품에 대한 키워드를 선택해주세요.');
    if (!reviewTitle.trim()) return alert('리뷰 제목을 작성해주세요.');
    if (!contentText.trim()) return alert('사용 후기를 작성해주세요.');

    const formData = new FormData();

    if (selectedImage) {
      formData.append('review_image', selectedImage);
    }

    formData.append('product', String(product.id));
    formData.append('rating', String(rating));
    formData.append('review_title', reviewTitle);
    formData.append('content', contentText);

    selectedKeywordIds.forEach((id) => {
      formData.append('keyword_ids', String(id));
    });

    createReview.mutate(formData, {
      onSuccess: () => {
        alert('리뷰가 성공적으로 등록되었습니다.');
        closeModal();
      },
      onError: (error: any) => {
        console.error('리뷰 등록 실패:', error.response);
        const specificMessage = error.response?.data?.detail;

        if (specificMessage) {
          alert(specificMessage);
        } else {
          alert('리뷰 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      },
    });
  };

  return (
    <ModalWrapper isOpen={modalType === 'review'} onClose={closeModal} title='리뷰 작성'>
      <form onSubmit={handleSubmit}>
        <div className='mt-[510px] flex items-center gap-4'>
          <img
            src={product.product_image[0]?.product_card_image}
            alt={product.product_name}
            className='w-24 object-cover'
          />
          <div>
            <h3 className='font-semibold'>{product.brand_name}</h3>
            <p className='text-primary-500-70'>{product.product_name}</p>
          </div>
        </div>
        <div className='mt-6'>
          <p className='mb-4 font-semibold'>상품 사진 또는 사용 사진을 올려주세요.</p>
          <div className='flex w-full items-center gap-6'>
            <ReviewImageUploadButton onFileSelect={handleImageSelect} />
            <p className='border-primary-500-40 text-primary-500-70 rounded-lg border p-4'>
              캡쳐 또는 도용한 이미지임이 확인되거나, 실제 상품이 보이지 않는 경우 적립금이 회수될
              수 있습니다.
            </p>
          </div>
        </div>
        <div className='mt-6'>
          <h4 className='font-semibold'>상품은 어떠셨나요?*</h4>
          <div className='py-2'>
            <ReviewRating onChange={handleRatingChange} />
          </div>
          <div className='flex flex-wrap gap-2'>
            <ReviewKeywords
              keywords={REVIEW_KEYWORDS}
              selectedKeywords={selectedKeywordIds}
              onKeywordSelect={handleKeywordIdToggle}
            />
          </div>
        </div>
        <div className='mt-6'>
          <h4 className='font-semibold'>사용 후기를 적어주세요*</h4>
          <div className='text-primary-500-40 mt-2 text-sm'>
            <p>[리뷰 작성 가이드]</p>
            <ul className='list-disc pl-5'>
              <li>사진을 첨부하시면 다른 구매자에게 더 큰 도움이 됩니다. (1장)</li>
              <li>200자 이상의 진솔한 후기를 기대합니다. (더 자세한 내용은 언제나 환영해요!)</li>
              <li>
                <span className='font-bold'>⚠ 참고해 주세요:</span> 신중하게 작성 부탁드립니다.
                등록하신 리뷰는 추후 수정이 어려우며 설령 리뷰의 수정이나 삭제를 원하실 경우에도
                편집 제한될 수 있습니다. 리뷰는 상품을 실제로 사용해보신 후에 작성해주시길 바랍니다.
              </li>
            </ul>
          </div>
          <input
            type='text'
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder='리뷰 제목을 입력해주세요.'
            className='input placeholder:text-primary-500-40 mt-4 w-full'
          />
          <textarea
            className='input placeholder:text-primary-500-40 mt-2 w-full'
            onChange={(e) => setContentText(e.target.value)}
            rows={6}
            placeholder='제품에 대해 만족스러웠던 점이나, 디자인, 사용감, 스타일링, 사용팁 등에 대해 남겨주세요.'
          />
        </div>
        <div className='mt-8 flex w-full justify-end space-x-4'>
          <ButtonBase onClick={closeModal} variant='hollow' className='w-full' type='button'>
            취소
          </ButtonBase>
          <ButtonBase
            variant='filled'
            className='w-full'
            type='submit'
            disabled={createReview.isPending}
          >
            {createReview.isPending ? '저장 중...' : '저장'}
          </ButtonBase>
        </div>
      </form>
    </ModalWrapper>
  );
}
