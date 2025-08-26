# دليل نشر الموقع على GitHub Pages
# Egyptian Institute Alexandria - GitHub Pages Deployment Guide

## ✅ قائمة التحقق من النشر

### 1. إعدادات GitHub Pages
- [ ] الذهاب إلى Settings → Pages في المستودع
- [ ] اختيار Source: GitHub Actions
- [ ] التأكد من تفعيل GitHub Pages

### 2. الملفات المطلوبة (✅ تم إنشاؤها)
- [x] `.github/workflows/deploy.yml` - سير عمل النشر الآلي
- [x] `.nojekyll` - منع معالجة Jekyll
- [x] `_config.yml` - إعدادات Jekyll (اختياري)
- [x] `package.json` - إدارة التبعيات
- [x] `build.sh` - سكريبت البناء والتحسين
- [x] `.gitignore` - تجاهل الملفات غير المطلوبة

### 3. التحسينات المطبقة (✅ تم تطبيقها)
- [x] تحويل المسارات المطلقة إلى نسبية
- [x] تحديث sitemap.xml بروابط GitHub Pages
- [x] تحديث robots.txt
- [x] ضغط وتحسين HTML/CSS/JS
- [x] إزالة الملفات غير الضرورية من البناء

### 4. اختبار النشر
```bash
# 1. رفع التغييرات للفرع الرئيسي
git add .
git commit -m "Enable GitHub Pages deployment"
git push origin main

# 2. مراقبة سير العمل
# اذهب إلى Actions في GitHub وتابع تقدم النشر

# 3. زيارة الموقع
# https://obieda-hussien.github.io/EIA/
```

### 5. التحقق من النشر الناجح
- [ ] الموقع يحمل بدون أخطاء
- [ ] جميع الصور والأصول تحمل بشكل صحيح
- [ ] الروابط الداخلية تعمل
- [ ] التصميم المتجاوب يعمل على الهواتف
- [ ] محتوى اللغة العربية يظهر بشكل صحيح (RTL)

### 6. مراقبة الأداء
- [ ] سرعة تحميل الصفحة
- [ ] نتائج SEO
- [ ] عمل خريطة الموقع
- [ ] ملف robots.txt

## 🚀 الأوامر المفيدة

### تطوير محلي
```bash
# تشغيل الخادم المحلي
npm start
# أو
python -m http.server 8000

# بناء الموقع للإنتاج
npm run build

# اختبار البناء المحسن
cd dist && python -m http.server 8001
```

### استكشاف الأخطاء
```bash
# فحص الملفات المبنية
ls -la dist/

# فحص المسارات
grep -r "href=\"/" dist/
grep -r "src=\"/" dist/

# فحص روابط GitHub Pages
grep -r "obieda-hussien.github.io" dist/
```

## 📝 ملاحظات مهمة

1. **الوقت المتوقع للنشر**: 2-5 دقائق بعد الـ push
2. **رابط الموقع**: https://obieda-hussien.github.io/EIA/
3. **مراقبة النشر**: GitHub Actions → الـ workflow "Deploy to GitHub Pages"
4. **التحديثات**: تحدث تلقائياً عند push إلى main branch

## ⚠️ مشاكل محتملة وحلولها

### المشكلة: الموقع لا يحمل
**الحل**: تحقق من GitHub Actions وتأكد من نجاح البناء

### المشكلة: الصور لا تظهر
**الحل**: تأكد من أن المسارات نسبية (تبدأ بـ `./`)

### المشكلة: CSS لا يحمل
**الحل**: تحقق من مسارات CDN أو الملفات المحلية

### المشكلة: الخطوط العربية لا تظهر
**الحل**: تأكد من تحميل Google Fonts بشكل صحيح