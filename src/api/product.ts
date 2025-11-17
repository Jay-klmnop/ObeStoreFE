import { backendAPI} from './backendAPI';
import type { ProductDetailType, ProductReviewType } from '@/types';

export async function getProductDetail(productId: number): Promise<ProductDetailType> {
    const { data } = await backendAPI.get('/products', {
        params: { 
            product_id: productId 
        }
    });

    if (Array.isArray(data)) {
        return data[0];
    }

    return data;
}

export async function getProductReviews(productId: number): Promise<ProductReviewType[]> {
    const { data } = await backendAPI.get('/reviews', {
        params: { product_id: productId }
    });
    return data.results || [];
}