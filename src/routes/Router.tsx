// Router.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import MyPageOrderInfo from '../pages/mypage/MyPageOrderInfo';
import MyPageOrderDetail from '../pages/mypage/MyPageOrderDetail';

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
