import { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { ProductSection} from '../features/home/ProductSection';
import type { Product } from '../types/product';
import type { DummyType } from '../types/dummyjson';

import main1 from '../assets/main1.png';
import main2 from '../assets/main2.png';
import main3 from '../assets/main3.png';
import whatsImg from '../assets/Whats.png';
import autumnImg from '../assets/Autumn.png';
import ringImg from '../assets/Ring.png';
import interiorImg from '../assets/Interior.png';
import { create } from 'zustand';
import { set } from 'zod';

const MainPage = () => {
  const [salesProducts, setSalesProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const bannerImages = [main1, main2, main3];

  const convertDummyToProduct = (dummy: DummyType): Product => {
    return {
      id: dummy.id,
      title: dummy.title,
      price: Math.round(dummy.price*1300),
      salePrice: Math.round(dummy.price*1300*(1 - dummy.discountPercentage / 100)),
      Image: dummy.thumbnail,
      description: dummy.description,
      category: dummy.category,
      images:dummy.category,
      detailimages: dummy.images,
      reviewCount: dummy.reviews?.length || 0,
      rating: dummy.rating,
      salesCount: dummy.stock,
      createdAt: dummy.meta?.createdAt || new Date().toISOString(),
    };
  };

  // 슬라이드 3초마다 변환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // 상품 데이터 불러오기
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);

        const [fashionRes, livingRes] = await Promise.all([
          fetch('https://dummyjson.com/products/category/fashion'),
          fetch('https://dummyjson.com/products/category/living'),
        ]);

        const [fashionData, livingData] = await Promise.all([
          fashionRes.json(),
          livingRes.json(),
        ]);

        setFashionProducts(fashionData.products.map(convertDummyToProduct).slice(0, 10));
        setLivingProducts(livingData.products.map(convertDummyToProduct).slice(0, 10));
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const CategoryCards = [
    { img: whatsImg, title: 'Whats In My Bag'},
    { img: autumnImg, title: 'Autumn Special Obejcts'},
    { img: ringImg, title: 'October Ring Collection'},
    { img: interiorImg, title: 'Interior Choices'},
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide = () => setCurrentSlide(prev) => (prev - 1 + bannerImages.length) %