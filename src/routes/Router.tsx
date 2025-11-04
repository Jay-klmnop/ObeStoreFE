import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, MyPageOrderDetail, MyPageOrderInfo, ProductDetailPage } from '@/pages';
import { Layout } from '@/components/layout';
import CartPage from '@/pages/CartPage';
import OrderPage from '@/pages/OrderPage';
import MyPage from '@/pages/mypage/MyPage';
import MyPageAddressInfo from '@/pages/mypage/MyPageAddressInfo';
import MyPageInfo from '@/pages/mypage/MyPageInfo';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/product/:id' element={<ProductDetailPage />} />
          <Route path='/cart/cart' element={<CartPage />} />
          <Route path='/order/order' element={<OrderPage />} />
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
