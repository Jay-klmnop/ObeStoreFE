import CartList from '@/features/cart/CartList';

export default function CartPage() {
  return (
    <>
      <section className='w-full bg-(--color-primary-500-0)'>
        <div className='w-[600px] bg-white'>
          <CartList />
        </div>
      </section>
    </>
  );
}
