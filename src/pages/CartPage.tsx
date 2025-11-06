import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Subtitle } from '@/components/ui/Subtitle';
import CartList from '@/features/cart/CartList';

export default function CartPage() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <section className='bg-primary-500-0 w-full px-3.5 py-4.5'>
          <Subtitle label='장바구니' />
          <CartList />
        </section>
      </QueryClientProvider>
    </>
  );
}
