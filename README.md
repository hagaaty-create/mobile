# TechVault Mobiles - Release & Signing Instructions

لقد تم تهيئة تطبيقك الآن لدعم التوقيع التلقائي (App Signing) ليكون جاهزاً للرفع مباشرة على متجر جوجل بلاي.

## الخطوة الأخيرة: إعداد مفاتيح التوقيع

بما أن المفاتيح سرية، يجب عليك إضافتها في حسابك على GitHub يدوياً باتباع الخطوات التالية:

### 1. إنشاء مفتاح التوقيع (إذا لم يكن لديك واحد)
افتح التيرمينال واكتب هذا الأمر (سيطلب منك كلمة مرور):
```bash
keytool -genkey -v -keystore release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

### 2. تحويل المفتاح إلى نص (Base64)
لإضافته إلى GitHub، قم بتحويل ملف الـ `.jks` الذي نتج عن الخطوة السابقة إلى نص:
```bash
base64 -w 0 release-key.jks > keystore_base64.txt
```
انسخ محتوى ملف `keystore_base64.txt`.

### 3. إضافة الأسرار إلى GitHub (Secrets)
اذهب إلى مستودع الكود الخاص بك في GitHub، ثم اذهب إلى **Settings > Secrets and variables > Actions**، وأضف الـ Secrets التالية:
- `ANDROID_KEYSTORE_BASE64`: الصق النص الذي نسخته من ملف `keystore_base64.txt`.
- `ANDROID_KEYSTORE_PASSWORD`: كلمة المرور التي اخترتها للملف.
- `ANDROID_KEY_ALIAS`: الاسم المستعار (مثلاً `my-key-alias`).
- `ANDROID_KEY_PASSWORD`: كلمة المرور الخاصة بالـ Alias (غالباً هي نفسها كلمة مرور الملف).

---

## كيف ترفع التطبيق بعد البناء؟
1. بعد كل `push` للكود، سيقوم GitHub ببناء ملف `.aab` موقع (Signed).
2. حمل الملف من تبويب **Actions** في GitHub تحت قسم **Artifacts**.
3. ارفع ملف الـ `.aab` مباشرة إلى **Google Play Console**.

---
تم الإعداد بواسطة Firebase Studio.
