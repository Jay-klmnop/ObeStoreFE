import type { ProductType } from '../../types/product';
import type { DummyType } from '../../types';
import { ProductCard } from '../product/ProductCard';

interface ProductSectionProps {
  title: string;
  products: ProductType[];
  isLoading: boolean;
}

// 추후 ProductCardType으로 변경예정
const convertToDummyType = (product: ProductType): DummyType => {
  return {
    id: product.id,
    title: product.product_name,
    description: product.category_name,
    category: product.category_name,
    price: product.product_value,
    discountPercentage: product.discount_rate,
    rating: product.product_rating,
    stock: product.product_stock,
    tags: [],
    brand: product.brand_name,
    sku: `SKU-${product.id}`,
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: product.product_stock > 0 ? 'In Stock' : 'Out of Stock',
    reviews: [{}, {}, {}],
    returnPolicy: '',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: product.created_at,
      updatedAt: product.updated_at,
      barcode: '',
      qrCode: ''
    },
    images: [product.product_image[0]?.product_card_image || ''],
    thumbnail: product.product_image[0]?.product_card_image || ''
  };
};

export const ProductSection = ({
  title,
  products,
  isLoading,
}: ProductSectionProps) => {
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

  if (!isLoading && products.length === 0) {
    return (
      <section className="mb-12 md:mb-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{title}</h2>
        <p className="text-stone-400">현재 표시할 상품이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={convertToDummyType(product)}
          />
        ))}
      </div>
    </section>
  );
};