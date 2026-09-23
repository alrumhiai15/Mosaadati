# مساعدتي
نسخة Web/PWA جاهزة للرفع إلى GitHub ثم Vercel.

الملفات:
- index.html: التطبيق كامل
- sw.js: العمل دون إنترنت
- manifest.webmanifest: التثبيت على الهاتف كـ PWA
- api/chat.js: بوابة آمنة للمساعد الذكي

Firebase:
افتح index.html واستبدل قيم YOUR_FIREBASE_* بقيم تطبيق الويب من Firebase.

Vercel:
بعد النشر، أضف Environment Variable باسم OPENAI_API_KEY وضع مفتاح API فيه. لا تضع المفتاح داخل index.html.

مهم:
نسخة PWA تعمل على الهاتف ويمكن تثبيتها من المتصفح. لإخراج APK/IPA أصلي سنستخدم نفس المشروع في مرحلة لاحقة مع Capacitor أو مسار نشر تطبيقات مناسب.
