import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { backendAPI } from '@/api';

interface QnAFormData {
  question_type: string;
  question_title: string;
  question_content: string;
}

export function useGetProductQnA(productId: number) {
  return useQuery({
    queryKey: ['productQnA', productId],
    queryFn: async () => {
      const res = await backendAPI.get(`/products/${productId}/qna/`);
      console.log('Q&A 목록 조회:', res.data);
      return res.data ?? [];
    },
    staleTime: 0,
    gcTime: 0,
  });
}

export function useCreateQnA(productId: number) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: QnAFormData) => {
      console.log('Q&A 작성 요청:', { ...data, product_id: productId });
      const res = await backendAPI.post('/qna', {
        ...data,
        product_id: productId
      });
      console.log('Q&A 작성 응답:', res.data);
      return res.data;
    },
    onSuccess: async (responseData) => {
      console.log('Q&A 작성 성공:', responseData);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('refetch 시작...');
      await queryClient.refetchQueries({ 
        queryKey: ['productQnA', productId],
        exact: true 
      });
      console.log('refetch 완료!');
    },
    onError: (error: any) => {
      console.error('Q&A 작성 실패:', error);
      console.error('에러 응답:', error.response?.data);
    }
  });
}

export function useUpdateQnA(productId: number) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ qnaId, data }: { qnaId: number; data: QnAFormData }) => {
      const res = await backendAPI.patch('/qna', {
        ...data,
        qna_id: qnaId
      });
      return res.data;
    },
    onSuccess: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await queryClient.refetchQueries({ queryKey: ['productQnA', productId] });
    }
  });
}

export function useDeleteQnA(productId: number) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (qnaId: number) => {
      const res = await backendAPI.delete('/qna', {
        data: {
          product_question_id: qnaId
        }
      });
      return res.data;
    },
    onSuccess: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      await queryClient.refetchQueries({ queryKey: ['productQnA', productId] });
    }
  });
}