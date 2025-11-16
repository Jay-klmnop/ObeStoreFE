import { backendAPI } from '@/api';
import type { UserPoint } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

// 📌 GET /users/me/points
export const fetchUserPoints = async (): Promise<UserPoint[]> => {
  const response = await backendAPI.get('/users/me/points');
  const data = response.data;

  console.log('📦 [GET] /users/me/points 응답:', data);

  if (Array.isArray(data)) return data;

  return [];
};

// 📌 TanStack Query
export const useUserPointsQuery = () => {
  return useQuery<UserPoint[]>({
    queryKey: ['user-points'],
    queryFn: fetchUserPoints,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
