import { OrderCard, OrderSideBar } from '@/features/order';
// import { useRewardStore } from '@/features/reward/store';
import { /* useEffect, */ useState } from 'react';

// import { OrderSideBar } from './OrderSideBar';
import OrderShippingCard from './OrderShippingCard';
import { ButtonBase } from '@/components/ui';
import { useOrdersQuery } from './api/useOrderQuery';
import { useUserPointsQuery } from './api/usePointQuery';
import { usePaymentQuery } from './api/usePaymentQuery';

export function OrderList() {
  const { data: payments = [] } = usePaymentQuery();
  console.log('📦 GET /payments 결과:', payments);
  // const { data: cartItems = [], isLoading: isLoadingCart, isError: isErrorCart } = useCartQuery();
  // const { availablePoints, usedPoints, setUsedPoints /* setEarnedPoints */ } = useRewardStore();
  // const {
  //   orderItems,
  //    checkedItemSum,
  //    totalQuantity,
  //   discountSum,
  //   shippingFee,
  //   selectedAddressId,
  // } = useOrderStore();
  const { data: orderItems = [] } = useOrdersQuery();
  // const orderSideData = orderItems.flatMap((order) =>
  //   order.order_products_detail.map((product) => ({
  //     order,
  //     product,
  //   }))
  // );
  console.log('최근 주문:', orderItems);
  const { data: points = [] } = useUserPointsQuery();
  const [deliveryRequest, setDeliveryRequest] = useState('');
  const totalAmountAllOrders = orderItems.reduce(
    (sum, order) =>
      sum + order.order_products_detail.reduce((innerSum, p) => innerSum + p.amount, 0),
    0
  );
  // const handleUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = Number(e.target.value);
  //   if (value > availablePoints) return alert('보유 적립금을 초과했습니다!');
  //   setUsedPoints(value);
  // };

  // const isLoading = isLoadingCart;
  // const isError = isErrorCart;

  // useEffect(() => {
  //   const earned = Math.floor(checkedItemSum * 0.01);
  //   setEarnedPoints(earned);
  // }, [checkedItemSum, setEarnedPoints]);

  // if (isLoading) return <div>결제 정보를 준비 중입니다...</div>;
  // if (isError || !cartItems) return <div>결제에 필요한 장바구니 정보를 찾을 수 없습니다.</div>;

  const handleDeliveryRequest = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeliveryRequest(e.target.value);
  };

  const handleSaveDeliveryRequest = () => {
    // if (!selectedAddress) return;
    // updateAddress.mutate(
    //   {
    //     ...selectedAddress,
    //     deliveryRequest,
    //   },
    //   {
    //     onSuccess: () => {
    //       alert('배송 요청사항이 저장되었습니다.');
    //     },
    //   }
    // );
  };

  return (
    <div className='m-auto flex w-full flex-col lg:flex-row lg:justify-between'>
      <div className='w-full bg-white px-7.5 py-5 lg:w-[calc(100%-470px)]'>
        <div className='relative px-2.5'>
          <OrderShippingCard />
          <div>
            <textarea
              placeholder='배송시 요청사항(100자 이내)'
              value={deliveryRequest}
              maxLength={100}
              onChange={handleDeliveryRequest}
              title='배송시 요청사항(100자 이내)'
              className='border-primary-500-70 text-primary-500-70 h-26 w-full resize-none rounded-lg border p-2.5'
            ></textarea>
            <ButtonBase
              variant='hollow'
              className='mt-2 flex justify-self-end px-3 py-1 text-sm'
              onClick={handleSaveDeliveryRequest}
            >
              배송 요청사항 저장
            </ButtonBase>
          </div>
          <div className='flex items-center justify-between p-2.5'>
            <div className='text-primary-500-90 text-lg font-bold'>
              주문 상품 {totalAmountAllOrders}개
            </div>
          </div>
          <div>
            {orderItems.map((order) => (
              <OrderCard key={order.id} order={order} products={order.order_products_detail} />
            ))}
          </div>
          <div className='pb-10'>
            <ul>
              <li className='text-primary-500-90 text-lg font-bold'>
                보유 적립금: {points[0]?.balance?.toLocaleString() ?? 0}원
              </li>
              {/* <li>
                {availablePoints < 5000 ? (
                  <input
                    type='text'
                    value={usedPoints || ''}
                    onChange={handleUsedChange}
                    className='border-custom-gray-20 bg-custom-gray-50 mt-5 w-full rounded-lg border p-2.5'
                    placeholder='최소 5000원 이상 보유 시 사용 가능'
                    disabled
                  />
                ) : (
                  <input
                    type='text'
                    value={usedPoints || ''}
                    onChange={handleUsedChange}
                    className='input mt-5 w-full rounded-lg border p-2.5'
                    placeholder='최소 5000원 이상 보유 시 사용 가능'
                  />
                )}
              </li> */}
            </ul>
          </div>
          <div className='pb-10'>
            <div className='text-primary-500-90 text-lg font-bold'>결제 수단</div>
          </div>
        </div>
      </div>
      <OrderSideBar />
      {/* // selectedAddressId={selectedAddressId}
        // discountAmount={discountSum}
        // deliveryAmount={shippingFee}
        // deliveryRequest={deliveryRequest} */}
    </div>
  );
}
