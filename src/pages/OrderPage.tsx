import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Subtitle } from '@/components/ui/Subtitle';
import OrderList from '@/features/order/OrderList';

export function OrderPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <section className='bg-primary-500-0 w-full px-3.5 py-4.5'>
          <Subtitle label='결제 목록' />
          <OrderList />
        </section>
      </QueryClientProvider>
    </>
  );
}
