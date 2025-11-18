import { useState, useEffect } from 'react';
import { ProductSection, useProductsQuery } from '@/features/product';
import { main1, main2, main3, autumn, interior, jewelry, whats } from '@/assets';
import { ReviewsSection } from '@/features/review';

export const MainPage = () => {
  const { data: newProducts = [], isLoading: isLoadingNew } = useProductsQuery({
    hasReview: false,
    sortOption: 'created_at',
  });

  const { data: saleProducts = [], isLoading: isLoadingSale } = useProductsQuery({
    hasDiscount: true,
  });
  const { data: allProducts = [], isLoading: isLoadingAll } = useProductsQuery({
    sortOption: '-created_at',
  });

  const loading = isLoadingNew || isLoadingSale || isLoadingAll;

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const bannerImages = [main1, main2, main3];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, bannerImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    setIsAutoPlaying(false);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    setIsAutoPlaying(false);
  };
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const categoryCards = [
    { img: whats, title: 'Whats In My Bag' },
    { img: autumn, title: 'Autumn Special Objects' },
    { img: jewelry, title: 'October Ring Collection' },
    { img: interior, title: 'Interior Choices' },
  ];

  return (
    <div className='font-pretendard min-h-screen bg-[#f6efed]'>
      <section
        className='relative h-[400px] w-full overflow-hidden md:h-[500px] lg:h-[600px]'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='relative h-full w-full'>
          {bannerImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`OBE STORE Banner ${index + 1}`}
                className='h-full w-full object-cover'
              />
              <div className='pointer-events-none absolute inset-0 bg-amber-900/5 mix-blend-multiply' />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white'
          aria-label='Previous Slide'
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white'
          aria-label='Next Slide'
        >
          →
        </button>
        <div className='absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2'>
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary-500-90 w-8' : 'w-2 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      <div className='mx-auto px-8 py-8 md:py-12 lg:py-16'>
        <section className='mb-12 md:mb-16 lg:mb-20'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6'>
            {categoryCards.map((item, index) => (
              <div
                key={index}
                className='group relative aspect-3/2 cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm'
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10'></div>
              </div>
            ))}
          </div>
        </section>

        <ProductSection title='New Items' products={newProducts} isLoading={loading} />
        <ProductSection title='Sale Items' products={saleProducts} isLoading={loading} />
        <ProductSection title='Objets' products={allProducts} isLoading={loading} />
        <ReviewsSection />
      </div>
    </div>
  );
};
