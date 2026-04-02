# تعليمات توقيع التطبيق ورفعه على جوجل بلاي

لقد تم إعداد مشروعك ليدعم التوقيع التلقائي. اتبع هذه الخطوات البسيطة من داخل التيرمينال في Firebase Studio:

## الخطوة 1: إنشاء مفتاح التوقيع (الأمر المختصر)
انسخ هذا الأمر بالكامل والصقه في التيرمينال واضغط Enter:
```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias techvault-key -storepass 123456 -keypass 123456 -dname "CN=TechVault, OU=Mobile, O=TechVault, L=Cairo, S=Cairo, C=EG"
```
*ملاحظة: لقد اخترنا كلمة مرور افتراضية هي `123456` لتسهيل الأمر عليك.*

## الخطوة 2: تحويل المفتاح إلى نص (Base64)
بعد تنفيذ الأمر السابق، سيظهر ملف جديد في قائمة الملفات باسم `release-key.jks`. الآن قم بتحويله لنص لكي نضعه في GitHub:
نفذ هذا الأمر في التيرمينال:
```bash
base64 -w 0 release-key.jks > keystore_base64.txt
```
افتح ملف `keystore_base64.txt` الجديد، وانسخ كل النص الموجود بداخله.

## الخطوة 3: إضافة الأسرار إلى GitHub
اذهب إلى مستودع الكود الخاص بك في GitHub، ثم اذهب إلى **Settings > Secrets and variables > Actions**، وأضف الـ Secrets التالية:

1. `ANDROID_KEYSTORE_BASE64`: الصق النص الذي نسخته من ملف `keystore_base64.txt`.
2. `ANDROID_KEYSTORE_PASSWORD`: اكتب `123456`.
3. `ANDROID_KEY_ALIAS`: اكتب `techvault-key`.
4. `ANDROID_KEY_PASSWORD`: اكتب `123456`.

---

## كيف تحمل النسخة الموقعة؟
بعد إضافة هذه البيانات، في المرة القادمة التي ترفع فيها الكود (`git push`)، سيقوم GitHub ببناء ملف `.aab` موقع (Signed) وجاهز للرفع فوراً للمتجر.
1. اذهب لتبويب **Actions**.
2. اختر آخر عملية بناء ناجحة.
3. حمل الملف من قسم **Artifacts**.
4. ارفع ملف الـ `.aab` مباشرة إلى **Google Play Console**.

تم الإعداد بواسطة Firebase Studio.
