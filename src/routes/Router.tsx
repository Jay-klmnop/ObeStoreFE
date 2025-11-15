import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  AboutPage,
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
import { OrderResult } from '@/features/order/OrderResult';
import PaymentButton from '@/features/order/PaymentButton';
import PayResultPage from '@/features/order/PayResultPage';
// import { ProtectedRoute } from '@/routes';

export function Router() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='/' element={<MainPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/product/:id' element={<ProductDetailPage />} />
            <Route path='/order/order' element={<OrderPage />} />
            <Route path='/order/success' element={<OrderSuccess />} />
            <Route path='/order/fail' element={<OrderFail />} />
            <Route path='/order/complete' element={<OrderComplete />} />
            <Route path='/order/result' element={<OrderResult />} />
            <Route path='/order/:orderId' element={<PaymentButton />} />
            <Route path='/order/result' element={<PayResultPage />} />
            {/* <Route element={<ProtectedRoute />}> </Route> */}
            <Route path='/users/favorites' element={<FavoritesPage />} />
            <Route path='/users/cart' element={<CartPage />} />
            <Route path='/users' element={<MyPageLayout />}>
              <Route index element={<MyPage />} />
              <Route path='orderinfo' element={<MyPageOrderInfo />} />
              <Route path='orderdetail' element={<MyPageOrderDetail />} />
              <Route path='addressinfo' element={<MyPageAddressInfo />} />
              <Route path='info' element={<MyPageInfo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
