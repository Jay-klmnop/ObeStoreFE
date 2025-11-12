import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductSection } from '../features/home/ProductSection';
import type { DummyType } from '../types/dummyjson';
import type { ProductType } from '../types/product';
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

const convertToProduct = (dummy: DummyType): Product => ({
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
});

const convertToProductType = (product: Product): ProductType => ({
  id: product.id,
  product_name: product.name,
  product_value: product.price,
  product_stock: product.salesCount || 0,
  discount_rate: product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) //소수점 반올림
    : 0,
  product_rating: product.rating || 0,
  dc_value: product.salePrice || product.price,
  created_at: product.createdAt || new Date().toISOString(),
  updated_at: product.createdAt || new Date().toISOString(),
  category_id: 1,
  category_name: product.category || '',
  brand_id: 1,
  brand_name: product.category || '',
  product_image: [
    {
      product_card_image: product.image,
      product_explain_image: product.image,
    },
  ],
  brand_image: [{ brand_image: '' }],
});

const fetchProducts = async (category?: string, limit?: number): Promise<Product[]> => {
  const url = category
    ? `https://dummyjson.com/products/category/${category}`
    : `https://dummyjson.com/products?limit=${limit || 20}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.products.map(convertToProduct);
};

export const MainPage = () => {
  const { data: newProducts = [], isLoading: isLoadingNew } = useQuery({
    queryKey: ['products', 'new'],
    queryFn: async () => {
      const products = await fetchProducts('furniture');
      return products.slice(0, 10);
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: saleProducts = [], isLoading: isLoadingSale } = useQuery({
    queryKey: ['products', 'sale'],
    queryFn: async () => {
      const products = await fetchProducts('beauty');
      return products
        .filter((p) => p.salePrice && p.salePrice < p.price)
        .sort((a, b) => {
          const discountA = ((a.price - (a.salePrice || a.price)) / a.price) * 100;
          const discountB = ((b.price - (b.salePrice || b.price)) / b.price) * 100;
          return discountB - discountA;
        })
        .slice(0, 10);
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: allProducts = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ['products', 'all'],
    queryFn: async () => {
      const products = await fetchProducts(undefined, 30);
      return products.slice(0, 10);
    },
    staleTime: 5 * 60 * 1000,
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
    { img: whatsImg, title: 'Whats In My Bag' },
    { img: autumnImg, title: 'Autumn Special Objects' },
    { img: ringImg, title: 'October Ring Collection' },
    { img: interiorImg, title: 'Interior Choices' },
  ];

  return (
    <div className="min-h-screen bg-[#f6efed] font-pretendard">
      <section
        className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-amber-900/5 mix-blend-multiply pointer-events-none" />
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          aria-label="Previous Slide"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
          aria-label="Next Slide"
        >
          →
        </button>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 border border-stone-400/50 ${
                index === currentSlide
                  ? 'bg-stone-700 w-8'
                  : 'bg-white/70 w-2 hover:bg-white'
              }`}
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
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </section>

        <ProductSection
          title="Objets"
          products={allProducts.map(convertToProductType)}
          isLoading={loading}
        />
        <ProductSection
          title="New Items"
          products={newProducts.map(convertToProductType)}
          isLoading={loading}
        />
        <ProductSection
          title="Sale Items"
          products={saleProducts.map(convertToProductType)}
          isLoading={loading}
        />
      </div>
    </div>
  );
};