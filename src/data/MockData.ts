import type { Product } from '../types/product';

export const mockProducts: Product[] = [
 // 세일 상품
  {
    id: 1,
    name: '트위티 크로스백',
    price: 78000,
    salePrice: 59000,
    image: 'https://via.placeholder.com/400x400?text=Crossbag',
    category: 'sale',
    description: '가볍고 실용적인 디자인의 미니 크로스백입니다. 비건 레더 소재로 환경까지 생각했습니다.',
    reviewCount: 156,
    rating: 4.7,
    salesCount: 342,
    createdAt: '2025-10-15',
    images: [
      'https://via.placeholder.com/400x400?text=Crossbag+1',
      'https://via.placeholder.com/400x400?text=Crossbag+2',
      'https://via.placeholder.com/400x400?text=Crossbag+3',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Crossbag+Detail+1',
      'https://via.placeholder.com/800x600?text=Crossbag+Detail+2',
    ],
    options: [
      { name: '종류', values: ['크로스백', '체인백', '미니백', '파우치'] },
    ],
  },
  {
    id: 3,
    name: '카멜 핸드백',
    price: 109000,
    salePrice: 89000,
    image: 'https://via.placeholder.com/400x400?text=Handbag',
    category: 'sale',
    description: '비건 레더 가죽으로 고급진 카멜 색의 심플한 핸드백입니다.',
    reviewCount: 178,
    rating: 4.6,
    salesCount: 223,
    createdAt: '2025-10-10',
    images: [
      'https://via.placeholder.com/400x400?text=Handbag+1',
      'https://via.placeholder.com/400x400?text=Handbag+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Handbag+Detail',
    ],
    options: [
      { name: '종류', values: ['핸드백', '토트백', '숄더백', '크로스백'] },
    ],
  },
  {
    id: 4,
    name: '체크패턴 머플러',
    price: 39000,
    salePrice: 29000,
    image: 'https://via.placeholder.com/400x400?text=Check+Muffler',
    category: 'sale',
    description: '가볍고 감성있는 체크패턴 머플러로 따뜻한 겨울 OOTD 완성',
    reviewCount: 189,
    rating: 4.2,
    salesCount: 512,
    createdAt: '2025-11-04',
    images: [
      'https://via.placeholder.com/400x400?text=Muffler+1',
      'https://via.placeholder.com/400x400?text=Muffler+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Muffler+Detail',
    ],
    options: [
      { name: '종류', values: ['체크 머플러', '플레인 머플러', '모던 머플러'] },
    ],
  },
  {
    id: 5,
    name: '코코아 레더 글러브',
    price: 39000,
    salePrice: 29000,
    image: 'https://via.placeholder.com/400x400?text=Leather+Gloves',
    category: 'sale',
    description: '코코아색의 가죽 글러브로 심플하지만 고급진 무드로 업그레이드',
    reviewCount: 234,
    rating: 4.8,
    salesCount: 298,
    createdAt: '2025-11-01',
    images: [
      'https://via.placeholder.com/400x400?text=Gloves+1',
      'https://via.placeholder.com/400x400?text=Gloves+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Gloves+Detail',
    ],
    options: [
      { name: '종류', values: ['레더 글러브', '가죽 장갑', '방한 글러브'] },
    ],
  },
  {
    id: 17,
    name: '카키W 볼캡',
    price: 34000,
    salePrice: 24900,
    image: 'https://via.placeholder.com/400x400?text=Cap',
    category: 'sale',
    description: '카키색 코듀로이 소재의 볼캡으로 완성한 내추럴 무드.',
    reviewCount: 145,
    rating: 4.1,
    salesCount: 289,
    createdAt: '2025-09-20',
    images: [
      'https://via.placeholder.com/400x400?text=Cap+1',
      'https://via.placeholder.com/400x400?text=Cap+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Cap+Detail',
    ],
    options: [
      { name: '종류', values: ['볼캡', '스냅백', '코듀로이 볼캡'] },
    ],
  },

  // 신상품
  {
    id: 7,
    name: '925 실버 링 세트',
    price: 43000,
    image: 'https://via.placeholder.com/400x400?text=Silver+Ring',
    category: 'new',
    description: '실버 925 레이어드링 세트로 어느 패션에나 다양한 무드로 연출 가능',
    reviewCount: 156,
    rating: 4.3,
    salesCount: 456,
    createdAt: '2025-10-01',
    images: [
      'https://via.placeholder.com/400x400?text=Ring+1',
      'https://via.placeholder.com/400x400?text=Ring+2',
      'https://via.placeholder.com/400x400?text=Ring+3',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Ring+Detail',
    ],
    options: [
      { name: '종류', values: ['플레인 링', '트위스트 링', '레이어드 링', '체인 링'] },
    ],
  },
  {
    id: 13,
    name: '물결 투톤 링',
    price: 37000,
    image: 'https://via.placeholder.com/400x400?text=Wave+Ring',
    category: 'new',
    description: '부드럽게 감기는 라인, 달콤한 무드.',
    reviewCount: 98,
    rating: 4.7,
    salesCount: 567,
    createdAt: '2025-09-15',
    images: [
      'https://via.placeholder.com/400x400?text=Wave+Ring+1',
      'https://via.placeholder.com/400x400?text=Wave+Ring+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Wave+Ring+Detail',
    ],
    options: [
      { name: '종류', values: ['웨이브 링', '플레인 링', '트위스트 링', '투링'] },
    ],
  },
  {
    id: 23,
    name: '코인 팬던트 목걸이',
    price: 59000,
    image: 'https://via.placeholder.com/400x400?text=Necklace',
    category: 'new',
    description: '확실한 존재감으로 불필요한 장식 없이 형태로 말하다.',
    reviewCount: 112,
    rating: 4.5,
    salesCount: 187,
    createdAt: '2025-11-03',
    images: [
      'https://via.placeholder.com/400x400?text=Necklace+1',
      'https://via.placeholder.com/400x400?text=Necklace+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Necklace+Detail',
    ],
    options: [
      { name: '종류', values: ['코인 팬던트', '체인 목걸이', '초커', '롱 체인'] },
    ],
  },
  {
    id: 29,
    name: '베이지 모먼트',
    price: 15000,
    image: 'https://via.placeholder.com/400x400?text=Vase',
    category: 'new',
    description: '따뜻한 베이지와 싱그러운 녹음이 어우러진 감성 화병.',
    reviewCount: 87,
    rating: 4.7,
    salesCount: 156,
    createdAt: '2025-10-28',
    images: [
      'https://via.placeholder.com/400x400?text=Vase+1',
      'https://via.placeholder.com/400x400?text=Vase+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Vase+Detail',
    ],
    options: [
      { name: '종류', values: ['원형 화병', '화병', '거실 화병', '주방 화병'] },
    ],
  },
  {
    id: 33,
    name: '트윈 머그 세트',
    price: 26000,
    image: 'https://via.placeholder.com/400x400?text=Mug',
    category: 'new',
    description: '달콤한 향기와 함께 번지는 여유의 순간, 둘이서 즐기는 잠깐의 여유.',
    reviewCount: 198,
    rating: 4.8,
    salesCount: 423,
    createdAt: '2025-11-02',
    images: [
      'https://via.placeholder.com/400x400?text=Mug+1',
      'https://via.placeholder.com/400x400?text=Mug+2',
    ],
    detailImages: [
      'https://via.placeholder.com/800x600?text=Mug+Detail',
    ],
    options: [
      { name: '종류', values: ['머그컵 세트', '트윈 머그', '커플컵', '머그컵'] },
    ],
  },
];

// 추후 Api 연동 시 대체 예정
// 카테고리별 필터링
export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

// 인기순(판매량 많은 순)
export const getProductsBySales = (): Product[] => {
  return [...mockProducts].sort((a, b) => 
    (b.salesCount || 0) - (a.salesCount || 0)
  );
};

// 가격 낮은 순
export const getProductsByPriceLow = (): Product[] => {
  return [...mockProducts].sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    return priceA - priceB;
  });
};

// 가격 높은 순
export const getProductsByPriceHigh = (): Product[] => {
  return [...mockProducts].sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    return priceB - priceA;
  });
};

// 최신순(등록일)
export const getProductsByNewest = (): Product[] => {
  return [...mockProducts].sort((a, b) => {
    const dateA = new Date(a.createdAt || '2024-01-01').getTime();
    const dateB = new Date(b.createdAt || '2024-01-01').getTime();
    return dateB - dateA; 
  });
};

// 리뷰 많은 순
export const getProductsSortedByReview = (): Product[] => {
  return [...mockProducts].sort((a, b) => 
    (b.reviewCount || 0) - (a.reviewCount || 0)
  );
};

// 평점 높은 순
export const getProductsSortedByRating = (): Product[] => {
  return [...mockProducts].sort((a, b) => 
    (b.rating || 0) - (a.rating || 0)
  );
};