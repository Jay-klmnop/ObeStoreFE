import { useState } from 'react';
import type { ProductDetailType } from '@/types';

interface ProductQnAProps {
  product: ProductDetailType;
}

interface QnAItem {
  id: number;
  question_type: string;
  question_title: string;
  question_content: string;
  question_answer: string | null;
  created_at: string;
  user_id: number;
}

const questionTypes = ['상품', '배송', '반품/교환', '기타'] as const;

export function ProductQnA({ product }: ProductQnAProps) {
  const [qnaList] = useState<QnAItem[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    question_type: '상품',
    question_title: '',
    question_content: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Q&A 작성:', { productId: product.id, ...formData });
    setIsWriting(false);
    setFormData({ question_type: '상품', question_title: '', question_content: '' });
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-primary-700">상품 문의</h3>
          <p className="text-sm text-primary-500-80 mt-1">상품에 대해 궁금한 점을 물어보세요.</p>
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
                className="px-6 py-2 bg-primary-700 text-white rounded hover:bg-primary-800 transition-colors">
                등록
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
          qnaList.map((qna) => (
            <div key={qna.id} 
            className="bg-white border border-primary-500-40 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div
                onClick={() => setExpandedId(expandedId === qna.id ? null : qna.id)}
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
                    </div>
                    <h4 className="font-medium text-primary-500-90 mb-1">
                      {qna.question_title}
                    </h4>
                    <p className="text-sm text-primary-500-60">
                      {new Date(qna.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-primary-500-60 transition-transform ${expandedId === qna.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedId === qna.id && (
                <div className="border-t border-primary-500-40 bg-primary-50">
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-sm text-primary-500-80 whitespace-pre-wrap">{qna.question_content}</p>
                    </div>

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
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}