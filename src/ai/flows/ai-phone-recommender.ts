
/**
 * @fileOverview محاكاة لوظيفة توصية الهواتف لضمان عمل التطبيق في وضع الـ Static Export للأندرويد.
 */

export interface AiPhoneRecommenderInput {
  conversationHistory: any[];
  currentMessage: string;
}

export interface AiPhoneRecommenderOutput {
  response: string;
  isRecommendation: boolean;
}

// قمنا بتحويل هذه الوظيفة لمحاكاة لتعمل داخل الموبايل بدون أخطاء السيرفر
export async function aiPhoneRecommender(input: AiPhoneRecommenderInput): Promise<AiPhoneRecommenderOutput> {
  console.log('AI Recommender Input:', input);
  
  // ردود تلقائية بسيطة لضمان عمل الواجهة
  return {
    response: "شكراً لسؤالك! بناءً على ما ذكرته، أرشح لك هاتف iPhone 15 Pro Max إذا كنت مهتماً بالتصوير، أو Galaxy S24 Ultra إذا كنت تريد أفضل أداء مع قلم. هل تود معرفة تفاصيل أكثر عن أحدهما؟",
    isRecommendation: true
  };
}
