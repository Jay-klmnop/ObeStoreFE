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
      const res = await backendAPI.post('/qna', {
        ...data,
        product_id: productId
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['productQnA', productId],
        exact: true,
      });
    },
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
      await queryClient.refetchQueries({ queryKey: ['productQnA', productId] });
    }
  });
}