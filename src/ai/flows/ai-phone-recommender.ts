/**
 * @fileOverview محاكاة لوظيفة توصية الهواتف.
 * تم إزالة 'use server' لضمان نجاح عملية الـ Build للأندرويد.
 */

export interface AiPhoneRecommenderInput {
  conversationHistory: any[];
  currentMessage: string;
}

export interface AiPhoneRecommenderOutput {
  response: string;
  isRecommendation: boolean;
}

export async function aiPhoneRecommender(input: AiPhoneRecommenderInput): Promise<AiPhoneRecommenderOutput> {
  console.log('AI Recommender Request:', input.currentMessage);
  
  // رد محاكاة يعمل بالكامل داخل الموبايل بدون الحاجة لسيرفر
  return {
    response: "شكراً لسؤالك! بناءً على ما ذكرته، أرشح لك هاتف iPhone 15 Pro Max إذا كنت مهتماً بالتصوير، أو Galaxy S24 Ultra إذا كنت تريد أفضل أداء مع قلم. هل تود معرفة تفاصيل أكثر عن أحدهما؟",
    isRecommendation: true
  };
}