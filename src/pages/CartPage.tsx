import { Subtitle } from '@/components/ui';
import { CartList } from '@/features/cart';

export function CartPage() {
  return (
    <section className='bg-primary-500-0 w-full px-3.5 py-4.5'>
      <Subtitle label='장바구니' />
      <CartList />
    </section>
  );
}
