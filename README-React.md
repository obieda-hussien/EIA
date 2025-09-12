# المعهد المصري - موقع إلكتروني بتقنية React

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4.1.0-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2.7-teal?style=for-the-badge&logo=tailwindcss)
![RTL Support](https://img.shields.io/badge/RTL_Support-Arabic-green?style=for-the-badge)

**موقع إلكتروني حديث للمعهد المصري لأكاديمية الإسكندرية • React • TailwindCSS • RTL**

</div>

## 🎓 حول المشروع

هذا هو الموقع الإلكتروني الرسمي للمعهد المصري لأكاديمية الإسكندرية للإدارة والمحاسبة، تم تطويره بأحدث التقنيات ليوفر تجربة مستخدم مثالية ودعم كامل للغة العربية.

### ✨ المميزات

- **🚀 أداء عالي** - مبني بـ React 18 و Vite
- **🎨 تصميم عصري** - واجهة مستخدم حديثة مع TailwindCSS
- **📱 استجابة كاملة** - يعمل على جميع الأجهزة والشاشات
- **🌐 دعم العربية** - RTL support كامل مع خطوط عربية جميلة
- **⚡ تحميل سريع** - Lazy loading وcode splitting
- **🔍 محسن للـ SEO** - Meta tags وStructured data
- **♿ إمكانية الوصول** - ARIA labels ودعم لوحة المفاتيح
- **🗺️ خرائط تفاعلية** - خريطة موقع المعهد بدون APIs خارجية

## 📂 هيكل المشروع

```
src/
├── components/
│   ├── common/          # مكونات مشتركة
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── MetaTags.jsx
│   ├── sections/        # أقسام الصفحات
│   │   ├── Hero.jsx
│   │   ├── AboutSection.jsx
│   │   ├── DepartmentsSection.jsx
│   │   ├── NewsSection.jsx
│   │   └── ContactSection.jsx
│   └── ui/              # مكونات واجهة المستخدم
│       ├── LoadingSpinner.jsx
│       └── Map.jsx
├── pages/               # الصفحات
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── DepartmentsPage.jsx
│   ├── NewsPage.jsx
│   └── ContactPage.jsx
├── context/             # React Context
│   └── NavigationContext.jsx
├── hooks/               # Custom hooks
│   └── useAnimations.js
├── assets/              # الأصول
│   └── styles/
│       └── index.css
└── utils/               # وظائف مساعدة
```

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 18** - أحدث إصدار من React
- **Vite** - أداة بناء سريعة وحديثة
- **React Router** - للتنقل بين الصفحات
- **React Helmet Async** - لإدارة meta tags

### Styling
- **TailwindCSS** - إطار عمل CSS حديث
- **Custom CSS** - للتحكم الدقيق في التصميم
- **Arabic Fonts** - خطوط Cairo و Tajawal

### Performance
- **Code Splitting** - تقسيم الكود لتحسين الأداء
- **Lazy Loading** - تحميل كسول للمكونات
- **Image Optimization** - تحسين الصور

## 🚀 البدء السريع

### متطلبات النظام
- Node.js 16+ 
- npm أو yarn

### التثبيت والتشغيل

1. **استنسخ المشروع**
   ```bash
   git clone https://github.com/obieda-hussien/EIA.git
   cd EIA
   ```

2. **ثبت التبعيات**
   ```bash
   npm install
   # أو
   yarn install
   ```

3. **شغل خادم التطوير**
   ```bash
   npm run dev
   # أو
   yarn dev
   ```

4. **افتح المتصفح**
   ```
   http://localhost:3000
   ```

### الأوامر المتاحة

```bash
# تشغيل خادم التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة البناء
npm run preview

# فحص الكود
npm run lint

# إصلاح أخطاء الكود
npm run lint:fix

# تشغيل الموقع الأصلي (للمقارنة)
npm run legacy-start
```

## 📱 الصفحات والأقسام

### الصفحة الرئيسية
- **Hero Section** - العنوان الرئيسي والCTAs
- **إحصائيات** - أرقام المعهد المهمة
- **التخصصات** - نظرة عامة على التخصصات
- **الأخبار** - آخر أخبار المعهد
- **معلومات التواصل** - خريطة وبيانات الاتصال

### صفحات فرعية
- **عن المعهد** - التاريخ والرؤية والرسالة
- **التخصصات** - تفاصيل كاملة عن كل تخصص
- **القبول** - شروط وخطوات التسجيل
- **النتائج** - استعلام عن الدرجات
- **الأخبار** - كل الأخبار والفعاليات
- **التواصل** - نموذج اتصال وخريطة

## 🎨 التخصيص

### تغيير المحتوى
ابحث في الملفات عن النصوص التالية واستبدلها:
- `[اسم المؤسسة التعليمية]` → اسم مؤسستك
- `[رقم الهاتف]` → رقم هاتفك
- `[البريد الإلكتروني]` → بريدك الإلكتروني
- `[عدد الطلاب]` → عدد الطلاب الحقيقي
- `[سنوات الخبرة]` → سنوات خبرة المؤسسة

### تغيير الألوان
في `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      'primary': {
        // ألوانك المخصصة هنا
      }
    }
  }
}
```

### إضافة صفحات جديدة
1. أنشئ مكون جديد في `src/pages/`
2. أضف المسار في `src/App.jsx`
3. أضف الرابط في `src/components/common/Sidebar.jsx`

## 📊 الأداء والتحسين

### Code Splitting
المشروع يستخدم dynamic imports لتقسيم الكود:
```js
const AboutPage = lazy(() => import('@pages/AboutPage'))
```

### SEO Optimization
- Meta tags ديناميكية لكل صفحة
- Structured data (Schema.org)
- Canonical URLs
- Open Graph tags

### الإمكانية
- ARIA labels لجميع العناصر التفاعلية
- دعم التنقل بلوحة المفاتيح
- تباين ألوان مناسب

## 🌐 النشر

### GitHub Pages
```bash
npm run build
# نشر محتوى مجلد dist
```

### Netlify/Vercel
1. اربط المشروع بـ Git
2. اختر الأوامر:
   - Build command: `npm run build`
   - Publish directory: `dist`

### الخادم الخاص
```bash
npm run build
# انسخ محتوى مجلد dist للخادم
```

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى:

1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit تغييراتك (`git commit -m 'Add some amazing feature'`)
4. Push للbranch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📝 الرخصة

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📧 التواصل

- **المطور**: obieda-hussien
- **GitHub**: [@obieda-hussien](https://github.com/obieda-hussien)
- **المشروع**: [https://github.com/obieda-hussien/EIA](https://github.com/obieda-hussien/EIA)

---

<div align="center">

**صنع بكل ❤️ لطلاب المعهد المصري**

[🌟 أعطنا نجمة](https://github.com/obieda-hussien/EIA) إذا أعجبك المشروع

</div>