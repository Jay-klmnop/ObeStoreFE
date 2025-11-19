import { useState } from 'react';
import type { ProductDetailType } from '@/types';
import { useGetProductQnA, useCreateQnA, useUpdateQnA, useDeleteQnA } from '@/features/product/hooks/useProductQnA';
import { useAuthStore } from '@/features/auth';

interface ProductQnAProps {
  product: ProductDetailType;
}

interface QnAItem {
  product_question_id: number;
  question_type: string;
  question_title: string;
  question_content: string;
  question_answer: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
  product_id: number;
}

const questionTypes = ['상품', '배송', '반품/교환', '기타'] as const;

export function ProductQnA({ product }: ProductQnAProps) {
  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = currentUser?.id;

  const [isWriting, setIsWriting] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    question_type: '상품',
    question_title: '',
    question_content: ''
  });

  const { data: qnaList = [], isLoading } = useGetProductQnA(product.id);
  const createMutation = useCreateQnA(product.id);
  const updateMutation = useUpdateQnA(product.id);
  const deleteMutation = useDeleteQnA(product.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await createMutation.mutateAsync(formData);
      alert('Q&A가 정상적으로 등록되었습니다!'); 
      setIsWriting(false);
      setFormData({ question_type: '상품', question_title: '', question_content: '' });
    } catch (error) {
      console.error('Q&A 작성 실패:', error);
      alert('Q&A 작성에 실패했습니다' + error);
    }
  };

  const handleEdit = (qna: QnAItem) => {
    setEditingId(qna.product_question_id);
    setFormData({
      question_type: qna.question_type,
      question_title: qna.question_title,
      question_content: qna.question_content
    });
  };

  const handleUpdate = async (qnaId: number) => {
    try {
      await updateMutation.mutateAsync({ qnaId, data: formData });
      setEditingId(null);
      setFormData({ question_type: '상품', question_title: '', question_content: '' });
    } catch (error) {
      console.error('Q&A 수정 실패:', error);
      alert('Q&A 수정에 실패했습니다.');
    }
  };

  const handleDelete = async (qnaId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await deleteMutation.mutateAsync(qnaId);
      setExpandedId(null);
    } catch (error) {
      console.error('Q&A 삭제 실패:', error);
      alert('Q&A 삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <div className="py-16 text-center">Loading</div>;
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-primary-700">상품 문의</h3>
        </div>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="px-6 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 transition-colors text-sm">
          {isWriting ? '취소' : '문의하기'}
        </button>
      </div>

      {isWriting && (
        <div className="bg-white border-2 border-primary-700 rounded-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-500-90 mb-2">문의 유형</label>
              <div className="flex flex-wrap gap-2">
                {questionTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, question_type: type })}
                    className={`px-4 py-2 rounded text-sm transition-colors ${
                      formData.question_type === type
                        ? 'bg-primary-700 text-white'
                        : 'bg-primary-50 text-primary-500-80 hover:bg-primary-100'
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-500-90 mb-2">제목</label>
              <input
                type="text"
                value={formData.question_title}
                onChange={(e) => setFormData({ ...formData, question_title: e.target.value })}
                placeholder="문의 제목을 입력하세요"
                className="w-full px-4 py-2 border border-primary-500-40 rounded focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                required/>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-500-90 mb-2">
                내용
              </label>
              <textarea
                value={formData.question_content}
                onChange={(e) => setFormData({ ...formData, question_content: e.target.value })}
                placeholder="문의 내용을 자세히 입력해주세요"
                rows={5}
                className="w-full px-4 py-2 border border-primary-500-40 rounded focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                required/>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="px-6 py-2 bg-white text-primary-700 border-2 border-primary-700 rounded hover:bg-primary-50 transition-colors">
                취소
              </button>
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="px-6 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 transition-colors disabled:opacity-50">
                {createMutation.isPending ? '등록 중...' : '등록'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {qnaList.length === 0 ? (
          <div className="text-center py-16 bg-primary-50 rounded-lg">
            <p className="text-4xl mb-4">💬</p>
            <p className="text-primary-500-80">아직 등록된 문의가 없습니다.</p>
          </div>
        ) : (
          qnaList.map((qna: QnAItem) => {
            const isMyQnA = qna.user_id === currentUserId;

            return (
              <div key={qna.product_question_id} 
              className="bg-white border border-primary-500-40 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div
                  onClick={() => setExpandedId(expandedId === qna.product_question_id ? null : qna.product_question_id)}
                  className="p-4 cursor-pointer hover:bg-primary-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded font-medium">
                      Q
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-primary-500-80 bg-primary-50 px-2 py-1 rounded">
                          {qna.question_type}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          qna.question_answer 
                            ? 'bg-primary-700 text-white' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {qna.question_answer ? '답변완료' : '답변대기'}
                        </span>
                        {isMyQnA && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            나의 Q&A
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-primary-500-90 mb-1">
                        {qna.question_title}
                      </h4>
                      <p className="text-sm text-primary-500-60">
                        {new Date(qna.created_at).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <svg
                      className={`w-5 h-5 text-primary-500-60 transition-transform ${expandedId === qna.product_question_id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {expandedId === qna.product_question_id && (
                  <div className="border-t border-primary-500-40 bg-primary-50">
                    <div className="p-4 space-y-4">
                      {editingId === qna.product_question_id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">문의 유형</label>
                            <div className="flex flex-wrap gap-2">
                              {questionTypes.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, question_type: type })}
                                  className={`px-4 py-2 rounded text-sm transition-colors ${
                                    formData.question_type === type
                                      ? 'bg-primary-700 text-white'
                                      : 'bg-primary-50 text-primary-500-80 hover:bg-primary-100'
                                  }`}>
                                  {type}
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="text"
                            value={formData.question_title}
                            onChange={(e) => setFormData({ ...formData, question_title: e.target.value })}
                            className="w-full px-4 py-2 border border-primary-500-40 rounded"
                            placeholder="제목"
                          />
                          <textarea
                            value={formData.question_content}
                            onChange={(e) => setFormData({ ...formData, question_content: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-2 border border-primary-500-40 rounded"
                            placeholder="내용"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setFormData({ question_type: '상품', question_title: '', question_content: '' });
                              }}
                              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                              취소
                            </button>
                            <button
                              onClick={() => handleUpdate(qna.product_question_id)}
                              disabled={updateMutation.isPending}
                              className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 disabled:opacity-50">
                              {updateMutation.isPending ? '수정 중' : '수정 완료'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <p className="text-sm text-primary-500-80 whitespace-pre-wrap">{qna.question_content}</p>
                          </div>

                          {isMyQnA && !qna.question_answer && (
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(qna)}
                                className="px-4 py-2 text-sm bg-white border border-primary-700 text-primary-700 rounded hover:bg-primary-50">
                                수정
                              </button>
                              <button
                                onClick={() => handleDelete(qna.product_question_id)}
                                disabled={deleteMutation.isPending}
                                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
                                {deleteMutation.isPending ? '삭제 중' : '삭제'}
                              </button>
                            </div>
                          )}

                          {qna.question_answer && (
                            <div className="bg-white border-l-4 border-primary-700 p-4 rounded">
                              <div className="flex items-start gap-3">
                                <span className="px-2 py-1 bg-primary-700 text-white text-xs rounded font-medium">
                                  A
                                </span>
                                <p className="flex-1 text-sm text-primary-500-80 whitespace-pre-wrap">{qna.question_answer}</p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}