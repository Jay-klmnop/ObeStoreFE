import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, MyPageOrderDetail, MyPageOrderInfo, ProductDetailPage } from '@/pages';
import { Layout } from '@/components/layout';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/product/:id' element={<ProductDetailPage />} />
          <Route path='/mypage/orderinfo' element={<MyPageOrderInfo />} />
          <Route path='/mypage/orderdetail' element={<MyPageOrderDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
