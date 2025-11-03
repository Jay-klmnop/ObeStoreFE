// Router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, MyPageOrderDetail, MyPageOrderInfo, ProductDetailPage } from '@/pages';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/product/:id' element={<ProductDetailPage />} />
        <Route path='/mypage/orderinfo' element={<MyPageOrderInfo />} />
        <Route path='/mypage/orderdetail' element={<MyPageOrderDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
