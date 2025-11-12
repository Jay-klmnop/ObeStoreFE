import { useState, useEffect } from 'react';
import { Header } from '../components/layout/header/Header';
import { Footer } from '../components/layout/footer';
import ProductSection from '../features/home/ProductSection';
import type { DummyType } from '../types/dummyjson';

// 이미지
import main1 from '../assets/main1.png';
import main2 from '../assets/main2.png';
import main3 from '../assets/main3.png';
import autumnImg from '../assets/Autumn.png';
import interiorImg from '../assets/Interior.png';
import ringImg from '../assets/Ring.png';
import whatsImg from '../assets/Whats.png';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  salePrice?: number;
  description?: string;
  category?: string;
  images?: string[];
  detailImages?: string[];
  reviewCount?: number;
  rating?: number;
  salesCount?: number;
  createdAt?: string;
}

const MainPage = () => {
  const [fashionProducts, setFashionProducts] = useState<Product[]>([]);
  const [livingProducts, setLivingProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 슬라이더 상태
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const bannerImages = [main1, main2, main3];

  // Dummy 데이터를 Product 타입으로 변환
  const convertDummyToProduct = (dummy: DummyType): Product => {
    return {
      id: dummy.id,
      name: dummy.title,
      price: Math.round(dummy.price * 1300),
      salePrice: Math.round(dummy.price * 1300 * (1 - dummy.discountPercentage / 100)),
      image: dummy.thumbnail,
      description: dummy.description,
      category: dummy.category,
      images: dummy.images,
      detailImages: dummy.images,
      reviewCount: dummy.reviews?.length || 0,
      rating: dummy.rating,
      salesCount: dummy.stock,
      createdAt: dummy.meta?.createdAt || new Date().toISOString(),
    };
  };

  // 자동 슬라이드 (3초마다)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 상품 데이터 로드
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const [fashionRes, livingRes, allRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/womens-dresses'),
          fetch('https://dummyjson.com/products/category/furniture'),
          fetch('https://dummyjson.com/products?limit=20'),
        ]);

        const [fashionData, livingData, allData] = await Promise.all([
          fashionRes.json(),
          livingRes.json(),
          allRes.json(),
        ]);

        setFashionProducts(fashionData.products.map(convertDummyToProduct).slice(0, 10));
        setLivingProducts(livingData.products.map(convertDummyToProduct).slice(0, 10));
        setAllProducts(allData.products.map(convertDummyToProduct).slice(0, 20));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // 카테고리 카드
  const categoryCards = [
    { img: whatsImg, title: 'Whats In My Bag' },
    { img: autumnImg, title: 'Autumn Special Objects' },
    { img: ringImg, title: 'October Ring Collection' },
    { img: interiorImg, title: 'Interior Choices' },
  ];

  // 슬라이드 제어
  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerImages.length);

  return (
    <div className="min-h-screen bg-[#f6efed] font-pretendard">
      <Header />
      <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        <div className="relative w-full h-full">
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
                className="w-full h-full object-cover sepia-[0.2] brightness-[0.95]"
              />
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          aria-label="이전 슬라이드"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          aria-label="다음 슬라이드"
        >
          →
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`${index + 1}번째 슬라이드로 이동`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <section className="mb-12 md:mb-16 lg:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {categoryCards.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-white shadow-sm"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 sepia-[0.15] brightness-[0.97]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        <ProductSection
          title="Objet"
          products={allProducts}
          isLoading={loading}
        />

        <ProductSection
          title="Fashion"
          products={fashionProducts}
          isLoading={loading}
        />

        <ProductSection
          title="Living"
          products={livingProducts}
          isLoading={loading}
        />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;