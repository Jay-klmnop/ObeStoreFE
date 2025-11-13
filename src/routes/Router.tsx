import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  CartPage,
  FavoritesPage,
  MainPage,
  MyPage,
  MyPageAddressInfo,
  MyPageInfo,
  MyPageOrderDetail,
  MyPageOrderInfo,
  OrderPage,
  ProductDetailPage,
  ProductsPage,
} from '@/pages';
import { MyPageLayout, RootLayout } from '@/components/layout';
import { OrderComplete, OrderFail, OrderSuccess } from '@/features/order';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Router() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/product/:id' element={<ProductDetailPage />} />
            <Route path='/order/order' element={<OrderPage />} />
            <Route path='/order/success' element={<OrderSuccess />} />
            <Route path='/order/fail' element={<OrderFail />} />
            <Route path='/order/complete' element={<OrderComplete />} />
            <Route path='/users' element={<MyPageLayout />}>
              <Route index element={<MyPage />} />
              <Route path='orderinfo' element={<MyPageOrderInfo />} />
              <Route path='orderdetail' element={<MyPageOrderDetail />} />
              <Route path='addressinfo' element={<MyPageAddressInfo />} />
              <Route path='info' element={<MyPageInfo />} />
              <Route path='favorites' element={<FavoritesPage />} />
              <Route path='cart' element={<CartPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
