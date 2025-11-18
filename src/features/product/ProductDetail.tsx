import { useState } from 'react';
import type { ProductDetailType } from '@/types';
import { ButtonBase, ReviewRating } from '@/components/ui';
import { ProductReviews } from '@/features/product';

interface ProductDetailProps {
  product: ProductDetailType;
}

export function ProductDetail({ product }: ProductDetailProps) {
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
          <section className='space-y-4'>
            <div className='text-primary-500-80 text-sm'>
              <span className='font-medium'>{product.brand_name}</span>
            </div>
          </section>

          <h1 className='text-primary-500-90 text-xl font-medium'>{product.product_name}</h1>

          {product.product_rating && (
            <ReviewRating initialValue={Number(product.product_rating)} readOnly />
          )}

          <div className='border-primary-500-40 space-y-3 border-t pt-4'>
            <div className='bg-primary-50 rounded px-4 py-3'>
              <span className='text-primary-500-90 text-sm font-medium'>FREE</span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className='border-primary-500-50 text-primary-700 flex h-8 w-8 items-center justify-center border'
                >
                  −
                </button>
                <span className='w-8 text-center text-sm'>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className='border-primary-500-50 text-primary-700 flex h-8 w-8 items-center justify-center border'
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
                <div className='text-primary-700 text-lg font-bold'>
                  {product.dc_value.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>

          <div className='border-primary-500-40 border-t pt-4'>
            <div className='flex items-center justify-between'>
              <span className='text-primary-500-80 text-sm'>총 {quantity}개</span>
              <span className='text-primary-700 text-2xl font-bold'>
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className='flex gap-2'>
            <button className='border-primary-500-50 hover:bg-primary-50 flex flex-col items-center justify-center border bg-white px-3 py-2 transition-all'>
              <span className='text-xl'>♡</span>
              <span className='text-primary-500-80 mt-1 text-xs'>
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

      <nav className='border-primary-500-40 bg-primary-50 border-t border-b'>
        <div className='mx-auto flex max-w-7xl overflow-x-auto'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-primary-700 text-primary-700 border-b-2'
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
                    <div className='text-primary-700 text-2xl font-bold'>{product.brand_name}</div>
                  )}
                </div>
                <h2 className='text-primary-500-90 text-xl font-bold'>{product.product_name}</h2>
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

        {activeTab === 'review' && <ProductReviews product={product} />}

        {activeTab === 'exchange' && (
          <div className='border-primary-500-40 rounded-lg border bg-white p-6'>
            <h3 className='text-primary-500-90 mb-4 text-lg font-bold'>교환 및 반품 안내</h3>
            <div className='text-primary-500-80 space-y-2 text-sm'>
              <p>• 상품 수령 후 7일 이내 교환/반품 가능합니다.</p>
              <p>• 단순 변심의 경우 왕복 배송비가 부과됩니다.</p>
              <p>• 상품 하자의 경우 무료 교환/반품이 가능합니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className='border-primary-500-40 rounded-lg border bg-white p-6'>
            <h3 className='text-primary-500-90 mb-4 text-lg font-bold'>배송 안내</h3>
            <div className='text-primary-500-80 space-y-2 text-sm'>
              <p>• 배송비: 무료배송</p>
              <p>• 배송 기간: 주문 후 2-3일 소요</p>
              <p>• 제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'qna' && <div className='text-primary-500-80 py-8 text-center'>Q&A</div>}
      </div>
    </article>
  );
}
