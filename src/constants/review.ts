export interface ReviewKeyword {
  id: number;
  keyword_type: 'positive' | 'negative' | 'neutral';
  keyword_name: string;
}

export const REVIEW_KEYWORDS: ReviewKeyword[] = [
  { id: 1, keyword_type: 'positive', keyword_name: '갓성비' },
  { id: 2, keyword_type: 'positive', keyword_name: '재구매 각' },
  { id: 3, keyword_type: 'positive', keyword_name: '강추해요' },
  { id: 4, keyword_type: 'positive', keyword_name: '디자인굿' },
  { id: 5, keyword_type: 'positive', keyword_name: '착용감 최고' },
  { id: 6, keyword_type: 'positive', keyword_name: '선물템' },
  { id: 7, keyword_type: 'positive', keyword_name: '이거다!!' },
  { id: 8, keyword_type: 'positive', keyword_name: '튼튼해요' },
  { id: 9, keyword_type: 'positive', keyword_name: '휘뚜루마뚜루' },
  { id: 10, keyword_type: 'positive', keyword_name: '실물깡패' },
  { id: 11, keyword_type: 'positive', keyword_name: '인생템' },
  { id: 12, keyword_type: 'positive', keyword_name: '초경량' },
  { id: 13, keyword_type: 'positive', keyword_name: '소장가치' },
  { id: 14, keyword_type: 'positive', keyword_name: '품절대란' },
  { id: 15, keyword_type: 'negative', keyword_name: '노코멘트' },
  { id: 16, keyword_type: 'neutral', keyword_name: '사진과 다름' },
  { id: 17, keyword_type: 'negative', keyword_name: '마감불량' },
  { id: 18, keyword_type: 'negative', keyword_name: '사이즈 다름' },
  { id: 19, keyword_type: 'negative', keyword_name: '기대 이하' },
  { id: 20, keyword_type: 'negative', keyword_name: '물빠짐' },
  { id: 21, keyword_type: 'negative', keyword_name: '조금 비쌈' },
  { id: 22, keyword_type: 'neutral', keyword_name: '무난해요' },
];

export const MAX_SIZE_MB = 5;
