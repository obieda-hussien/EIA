# المعهد المصري لأكاديمية الإسكندرية - النظام المتكامل

## نظرة عامة

تم تطوير هذا النظام ليكون موقعاً متكاملاً للمعهد المصري لأكاديمية الإسكندرية مع لوحة إدارة شاملة ونظام مصادقة للطلاب. النظام يستخدم Firebase كخدمة خلفية لإدارة البيانات والمصادقة.

## الميزات الرئيسية

### 1. الموقع الرئيسي
- **تصميم أنيق ومتجاوب**: يدعم جميع الأجهزة والشاشات
- **محتوى ديناميكي**: يتم جلب المحتوى من Firebase في الوقت الفعلي
- **نظام مصادقة للطلاب**: تسجيل دخول اختياري باستخدام كود الطالب + آخر 5 أرقام من الرقم القومي
- **استعلام عن النتائج**: نظام آمن للاستعلام عن نتائج الطلاب
- **التسجيل في الفعاليات**: إمكانية التسجيل في الفعاليات والورش
- **الإشعارات الفورية**: تنبيهات للأخبار العاجلة والتحديثات

### 2. لوحة الإدارة
- **إدارة المقالات**: إضافة وتعديل وحذف المقالات
- **إدارة الأخبار**: نشر الأخبار العادية والعاجلة
- **إدارة الفعاليات**: تنظيم الفعاليات ومتابعة التسجيلات
- **إدارة الطلاب**: إضافة وتعديل بيانات الطلاب
- **إدارة النتائج**: رفع وإدارة نتائج الطلاب
- **نظام الإشعارات**: إرسال إشعارات فورية للمستخدمين
- **الإحصائيات**: لوحة تحكم تفاعلية بالإحصائيات

### 3. Firebase Backend
- **Firestore Database**: قاعدة بيانات منظمة للمحتوى
- **Realtime Database**: إشعارات فورية
- **Authentication**: نظام مصادقة آمن
- **Security Rules**: قواعد أمان محكمة

## متطلبات النظام

- متصفح ويب حديث يدعم HTML5 و CSS3 و JavaScript ES6+
- اتصال بالإنترنت لـ Firebase
- حساب Firebase (مجاني)

## إعداد النظام

### 1. إعداد Firebase

1. أنشئ مشروع جديد في [Firebase Console](https://console.firebase.google.com)
2. فعّل المصادقة (Authentication) مع إعداد Sign-in anonymously
3. أنشئ قاعدة بيانات Firestore
4. أنشئ قاعدة بيانات Realtime Database
5. انسخ إعدادات Firebase وضعها في `js/firebase-config.js`

### 2. إعداد الأمان

قم بإضافة القواعد التالية لـ Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Articles - read for all, write for authenticated admins only
    match /articles/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // News - read for all, write for authenticated admins only
    match /news/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Events - read for all, write for authenticated admins only
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Event registrations - write for all, read for admins only
    match /event_registrations/{document} {
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
      allow create: if true;
    }
    
    // Students - read/write for authenticated admins only
    match /students/{document} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Results - read/write for authenticated admins only
    match /results/{document} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Notifications - read for all, write for authenticated admins only
    match /notifications/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Admins - read/write for authenticated admins only
    match /admins/{document} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
  }
}
```

قواعد Realtime Database:

```json
{
  "rules": {
    "notifications": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

### 3. إنشاء حساب مدير

1. في Firebase Console، اذهب إلى Authentication
2. أنشئ مستخدم جديد بالبريد الإلكتروني: `admin@eia.edu.eg`
3. في Firestore، أنشئ مجموعة `admins`
4. أضف وثيقة جديدة بـ UID المستخدم المنشأ:

```json
{
  "name": "مسؤول النظام",
  "email": "admin@eia.edu.eg",
  "role": "super_admin",
  "permissions": ["all"],
  "active": true
}
```

## استخدام النظام

### 1. الموقع الرئيسي

- افتح `index.html` في المتصفح
- تصفح المحتوى المختلف (الرئيسية، عن المعهد، التخصصات، إلخ)
- للدخول كطالب: اضغط "تسجيل الدخول" واختر "طالب"
- للاستعلام عن النتائج: اذهب لقسم "النتائج" وادخل البيانات المطلوبة

### 2. لوحة الإدارة

- افتح `admin.html` في المتصفح
- سجل الدخول باستخدام بيانات المدير
- استخدم القائمة الجانبية للتنقل بين الأقسام المختلفة

#### إدارة المحتوى

**المقالات:**
- اضغط "إضافة مقال جديد"
- املأ البيانات المطلوبة
- اختر "نشر المقال" لجعله مرئياً في الموقع

**الأخبار:**
- اضغط "إضافة خبر جديد"
- املأ العنوان والمحتوى
- اختر "خبر عاجل" للأخبار المهمة

**الفعاليات:**
- اضغط "إضافة فعالية جديدة"
- حدد التاريخ والمكان والسعة
- فعّل "فتح التسجيل" للسماح للطلاب بالتسجيل

#### إدارة البيانات

**الطلاب:**
- أضف بيانات الطلاب (كود الطالب، الاسم، التخصص، إلخ)
- تأكد من إدخال آخر 5 أرقام من الرقم القومي بشكل صحيح

**النتائج:**
- أضف نتائج الطلاب مع تفاصيل المواد
- ربط النتائج بكود الطالب وآخر 5 أرقام من الرقم القومي

## البيانات التجريبية

عند فتح الموقع لأول مرة، سيتم إنشاء بيانات تجريبية تلقائياً تشمل:

### طلاب تجريبيون:
- **الطالب 1:** كود EIA2024001، آخر 5 أرقام: 12345
- **الطالب 2:** كود EIA2024002، آخر 5 أرقام: 67890
- **الطالب 3:** كود EIA2024003، آخر 5 أرقام: 54321

### بيانات أخرى:
- مقالات عن أنشطة المعهد
- أخبار حديثة
- فعاليات قادمة
- نتائج تجريبية للطلاب

## الميزات التقنية

### 1. الأمان
- مصادقة آمنة للطلاب والإداريين
- قواعد أمان Firebase محكمة
- تشفير البيانات أثناء النقل

### 2. الأداء
- تحميل ديناميكي للمحتوى
- تخزين مؤقت للبيانات
- تحسين الصور والموارد

### 3. تجربة المستخدم
- تصميم متجاوب يدعم جميع الأجهزة
- واجهة باللغة العربية
- إشعارات فورية
- انتقالات سلسة

## استكشاف الأخطاء

### مشاكل Firebase
1. تأكد من صحة إعدادات Firebase في `firebase-config.js`
2. تحقق من تفعيل الخدمات المطلوبة في Firebase Console
3. راجع قواعد الأمان في Firestore و Realtime Database

### مشاكل المصادقة
1. تأكد من تفعيل Anonymous sign-in في Firebase Authentication
2. تحقق من وجود وثيقة المدير في مجموعة `admins`

### مشاكل البيانات
1. تحقق من اتصال الإنترنت
2. افتح Console في المتصفح لرؤية رسائل الخطأ
3. تأكد من تشغيل `data-initializer.js` لإنشاء البيانات التجريبية

## الدعم والصيانة

- مراجعة دورية لقواعد الأمان
- نسخ احتياطية منتظمة للبيانات
- مراقبة استخدام Firebase لتجنب تجاوز الحدود المجانية
- تحديث المحتوى بانتظام

## التطوير المستقبلي

- إضافة نظام دفع إلكتروني
- تطبيق موبايل
- نظام إدارة المكتبة
- تقارير مفصلة وتحليلات

---

تم تطوير هذا النظام بحب للمعهد المصري لأكاديمية الإسكندرية ❤️