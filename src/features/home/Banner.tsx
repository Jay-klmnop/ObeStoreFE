import { useState, useEffect, useCallback } from 'react';
import { main1, main2, main3 } from '@/assets';

interface BannerSlide {
  id: number;
  image: string;
  alt: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    image: main1,
    alt: '배너 이미지 1',
  },
  {
    id: 2,
    image: main2,
    alt: '배너 이미지 2',
  },
  {
    id: 3,
    image: main3,
    alt: '배너 이미지 3',
  },
];

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div
      className='relative h-[300px] w-full overflow-hidden bg-stone-100 sm:h-[400px] md:h-[500px] lg:h-[600px]'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className='flex h-full transition-transform duration-700 ease-in-out'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerSlides.map((slide) => (
          <div key={slide.id} className='relative h-full min-w-full'>
            <img src={slide.image} alt={slide.alt} className='h-full w-full object-cover' />
            <div className='pointer-events-none absolute inset-0 bg-amber-900/5 mix-blend-multiply' />
          </div>
        ))}
      </div>

      <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-6 sm:gap-3'>
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full border border-stone-400/50 transition-all duration-300 ${
              currentSlide === index ? 'w-6 bg-stone-700 sm:w-8' : 'w-2 bg-white/70 hover:bg-white'
            }`}
            aria-label={`${index + 1}번 슬라이드로 이동`}
          />
        ))}
      </div>
    </div>
  );
};
