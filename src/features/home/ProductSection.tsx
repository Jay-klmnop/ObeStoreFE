import type { Product, ProductCardType } from '../../types/product';
import { ProductCard } from '../product/ProductCard';

interface ProductSectionProps {
  title: string;
  products: Product[];  
  isLoading: boolean;
}

const convertToProductCardType = (product: Product): ProductCardType => {
  return {
    id: product.id,
    product_name: product.name,                          
    product_brand: product.category || 'OBE-STORE',     
    product_price: String(product.salePrice || product.price),  
    product_rating: String(product.rating || 4.5),      
    product_image: {
      thumbnail: product.image                           
    }
  };
};

const ProductSection = ({ title, products, isLoading }: ProductSectionProps) => {
  // 로딩 중
  if (isLoading) {
    return (
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 상품이 없을 때
  if (products.length === 0) {
    return (
      <section className="mb-12 md:mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{title}</h2>
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-lg">
          상품이 없습니다.
        </div>
      </section>
    );
  }

  // 상품이 있을 때
  return (
    <section className="mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{title}</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={convertToProductCardType(product)}
          />
        ))}
      </div>
    </section>
  );
};