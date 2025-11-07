import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  CartPage,
  MainPage,
  MyPage,
  MyPageAddressInfo,
  MyPageInfo,
  MyPageOrderDetail,
  MyPageOrderInfo,
  OrderPage,
  ProductDetailPage,
} from '@/pages';
import { Layout } from '@/components/layout';
import { OrderSuccess } from '@/features/order/OrderSuccess';
import { OrderFail } from '@/features/order/OrderFail';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/product/:id' element={<ProductDetailPage />} />
          <Route path='/cart/cart' element={<CartPage />} />
          <Route path='/order/order' element={<OrderPage />} />
          <Route path='/order/success' element={<OrderSuccess />} />
          <Route path='/order/fail' element={<OrderFail />} />
          <Route path='/mypage/orderinfo' element={<MyPageOrderInfo />} />
          <Route path='/mypage/orderdetail' element={<MyPageOrderDetail />} />
          <Route path='/mypage/mypage' element={<MyPage />} />
          <Route path='/mypage/addressinfo' element={<MyPageAddressInfo />} />
          <Route path='/mypage/info' element={<MyPageInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
