import { useState, useEffect, useCallback } from 'react';
import main1 from '@/assets/main1.jpg';
import main2 from '@/assets/main2.jpg';
import main3 from '@/assets/main3.jpg';

interface BannerSlide {
  id: number;
  image: string;
  alt: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1, image: main1, alt: '배너 이미지 1'
  },
  {
    id: 2, image: main2, alt: '배너 이미지 2'
  },
  {
    id: 3, image: main3, alt: '배너 이미지 3'
  }
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
      className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-stone-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerSlides.map((slide) => (
          <div 
            key={slide.id}
            className="min-w-full h-full relative"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-amber-900/5 mix-blend-multiply pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 border border-stone-400/50
                       ${currentSlide === index 
                         ? 'bg-stone-700 w-6 sm:w-8' 
                         : 'bg-white/70 w-2 hover:bg-white'}`}
            aria-label={`${index + 1}번 슬라이드로 이동`}
          />
        ))}
      </div>
    </div>
  );
};