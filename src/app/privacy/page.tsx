
export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl" dir="rtl">
      <h1 className="text-4xl font-headline font-black mb-8">سياسة <span className="text-primary">الخصوصية</span></h1>
      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground">1. جمع المعلومات</h2>
          <p>نحن نجمع المعلومات التي تقدمها لنا مباشرة عند إنشاء حساب أو إجراء عملية شراء، بما في ذلك الاسم والبريد الإلكتروني وعنوان الشحن.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">2. استخدام المعلومات</h2>
          <p>نستخدم المعلومات لمعالجة طلباتك، وتحسين تجربة التسوق، والتواصل معك بشأن حالة الطلب أو العروض الترويجية.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">3. حماية البيانات</h2>
          <p>نحن نستخدم تقنيات Firebase الآمنة لضمان حماية بياناتك الشخصية ومعلومات الدفع الخاصة بك.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground">4. ملفات تعريف الارتباط</h2>
          <p>نستخدم ملفات تعريف الارتباط لتحسين أداء الموقع وحفظ سلة المشتريات الخاصة بك.</p>
        </section>
        <p className="text-sm pt-10">آخر تحديث: 2024</p>
      </div>
    </div>
  );
}
