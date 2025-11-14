import { useState } from 'react';
import { Home } from 'lucide-react';
import type { ProductDetailType, ProductReviewType } from '@/types';
import { ReviewGrid } from '@/features/review';
import { ButtonBase } from '@/components/ui/ButtonBase';

interface ProductDetailProps {
  product: ProductDetailType;
  reviews?: ProductReviewType[];
  reviewsLoading?: boolean;
  reviewsError?: Error | null;
}

export function ProductDetail({ product, reviews, reviewsLoading, reviewsError }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('info');

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  const totalPrice = product.dc_value * quantity;

  const tabs = [
    { id: 'info', label: '상품 정보' },
    { id: 'review', label: '리뷰(구매후기)' },
    { id: 'exchange', label: '교환/환불' },
    { id: 'shipping', label: '배송 안내' },
    { id: 'qna', label: '상품 Q&A' },
  ];

  return (
    <article className='mx-auto max-w-7xl'>
      <div className='grid grid-cols-1 gap-8 p-6 lg:grid-cols-2'>
        <section>
          <div className='overflow-hidden bg-white'>
            <img
              src={product.product_image[0]?.product_card_image}
              alt={product.product_name}
              className='h-auto w-full object-cover'
            />
          </div>
        </section>

        <section className='space-y-4'>
          <div className='flex items-center gap-2 text-sm text-primary-500-80'>
            <Home className='h-4 w-4' />
            <span className='font-medium'>{product.brand_name}</span>
          </div>

          <h1 className='text-xl font-medium text-primary-500-90'>{product.product_name}</h1>

          {product.product_rating && (
            <div className='flex items-center gap-2 text-sm text-primary-500-80'>
              <span>⭐⭐⭐⭐⭐</span>
              <span>({product.product_rating})</span>
            </div>
          )}

          <div className='space-y-3 border-t border-primary-500-40 pt-4'>
            <div className='rounded bg-primary-50 px-4 py-3'>
              <span className='text-sm font-medium text-primary-500-90'>FREE</span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className='flex h-8 w-8 items-center justify-center border border-primary-500-50 text-primary-700'
                >
                  −
                </button>
                <span className='w-8 text-center text-sm'>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className='flex h-8 w-8 items-center justify-center border border-primary-500-50 text-primary-700'
                >
                  +
                </button>
              </div>

              <div className='text-right'>
                {product.discount_rate > 0 && (
                  <div className='text-xs text-gray-400 line-through'>
                    {product.product_value.toLocaleString()}원
                  </div>
                )}
                <div className='text-lg font-bold text-primary-700'>
                  {product.dc_value.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>

          <div className='border-t border-primary-500-40 pt-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-primary-500-80'>총 {quantity}개</span>
              <span className='text-2xl font-bold text-primary-700'>
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className='flex gap-2'>
            <button className='flex flex-col items-center justify-center border border-primary-500-50 bg-white px-3 py-2 transition-all hover:bg-primary-50'>
              <span className='text-xl'>♡</span>
              <span className='mt-1 text-xs text-primary-500-80'>
                {product.favorite_count || 0}
              </span>
            </button>

            <ButtonBase variant='hollow' className='flex-1 py-3 text-sm'>
              장바구니
            </ButtonBase>

            <ButtonBase variant='filled' className='flex-1 py-3 text-sm'>
              구매하기
            </ButtonBase>
          </div>
        </section>
      </div>

      <nav className='border-b border-t border-primary-500-40 bg-primary-50'>
        <div className='mx-auto flex max-w-7xl overflow-x-auto'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 whitespace-nowrap px-4 py-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary-700 text-primary-700'
                  : 'text-primary-500-80 hover:text-primary-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <div className='mx-auto max-w-7xl p-6'>
        {activeTab === 'info' && (
          <div className='space-y-8'>
            {product.brand_name && (
              <section className='text-center'>
                <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center'>
                  {product.brand_image?.[0]?.brand_image ? (
                    <img 
                      src={product.brand_image[0].brand_image} 
                      alt={product.brand_name} 
                      className='h-full w-full object-contain' 
                    />
                  ) : (
                    <div className='text-2xl font-bold text-primary-700'>{product.brand_name}</div>
                  )}
                </div>
                <h2 className='text-xl font-bold text-primary-500-90'>{product.product_name}</h2>
              </section>
            )}

            {product.product_image[0]?.product_explain_image && (
              <section className='w-full'>
                <img
                  src={product.product_image[0].product_explain_image}
                  alt={`${product.product_name} 상세 이미지`}
                  className='w-full'
                />
              </section>
            )}
          </div>
        )}

        {activeTab === 'review' && (
          <div>
            {reviewsLoading ? (
              <div className='flex items-center justify-center py-12'>
                <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary-500-40 border-t-primary-700'></div>
              </div>
            ) : reviewsError ? (
              <div className='rounded-lg border-2 border-red-200 bg-red-50 p-6 text-center'>
                <p className='text-red-600'>리뷰를 불러오는데 실패했습니다.</p>
              </div>
            ) : reviews && reviews.length > 0 ? (
              <ReviewGrid reviews={reviews} />
            ) : (
              <div className='rounded-lg border border-primary-500-40 bg-white p-12 text-center'>
                <p className='text-primary-500-80'>아직 작성된 리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'exchange' && (
          <div className='rounded-lg border border-primary-500-40 bg-white p-6'>
            <h3 className='mb-4 text-lg font-bold text-primary-500-90'>교환 및 반품 안내</h3>
            <div className='space-y-2 text-sm text-primary-500-80'>
              <p>• 상품 수령 후 7일 이내 교환/반품 가능합니다.</p>
              <p>• 단순 변심의 경우 왕복 배송비가 부과됩니다.</p>
              <p>• 상품 하자의 경우 무료 교환/반품이 가능합니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className='rounded-lg border border-primary-500-40 bg-white p-6'>
            <h3 className='mb-4 text-lg font-bold text-primary-500-90'>배송 안내</h3>
            <div className='space-y-2 text-sm text-primary-500-80'>
              <p>• 배송비: 무료배송</p>
              <p>• 배송 기간: 주문 후 2-3일 소요</p>
              <p>• 제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'qna' && (
          <div className='py-8 text-center text-primary-500-80'>
            Q&A
          </div>
        )}
      </div>
    </article>
  );
}