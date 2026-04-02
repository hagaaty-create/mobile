# تعليمات توقيع التطبيق ورفعه على جوجل بلاي

لقد تم إعداد مشروعك ليدعم التوقيع التلقائي. لكي يعمل هذا النظام، يجب عليك اتباع الخطوات التالية لمرة واحدة فقط:

## الخطوة 1: إنشاء مفتاح التوقيع (Keystore)
افتح التيرمينال في جهازك ونفذ الأمر التالي:
```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias techvault-key
```
*سيطلب منك كلمة مرور، تذكرها جيداً لأنك ستحتاجها في الخطوة التالية.*

## الخطوة 2: تحويل المفتاح إلى نص (Base64)
بما أننا لا نستطيع رفع ملفات ثنائية إلى GitHub Secrets، سنقوم بتحويل الملف إلى نص:
- **في ويندوز (PowerShell):**
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("release-key.jks")) > keystore_base64.txt
  ```
- **في ماك أو لينكس:**
  ```bash
  base64 -i release-key.jks > keystore_base64.txt
  ```
انسخ المحتوى الموجود داخل ملف `keystore_base64.txt`.

## الخطوة 3: إضافة الأسرار إلى GitHub
اذهب إلى مستودع الكود الخاص بك في GitHub، ثم اذهب إلى **Settings > Secrets and variables > Actions**، وأضف الـ Secrets التالية:

1. `ANDROID_KEYSTORE_BASE64`: الصق النص الذي نسخته من ملف `keystore_base64.txt`.
2. `ANDROID_KEYSTORE_PASSWORD`: كلمة المرور التي اخترتها للمفتاح.
3. `ANDROID_KEY_ALIAS`: الاسم المستعار الذي اخترته (في مثالنا هو `techvault-key`).
4. `ANDROID_KEY_PASSWORD`: كلمة المرور الخاصة بالـ Alias (غالباً هي نفسها كلمة مرور المفتاح).

---

## كيف تحمل النسخة الموقعة؟
بعد إضافة هذه البيانات، في المرة القادمة التي ترفع فيها الكود (`git push`)، سيقوم GitHub ببناء ملف `.aab` موقع (Signed). 
1. اذهب لتبويب **Actions**.
2. اختر آخر عملية بناء ناجحة.
3. حمل الملف من قسم **Artifacts**.
4. هذا الملف هو الذي ترفعه مباشرة إلى **Google Play Console**.

تم الإعداد بواسطة Firebase Studio.
