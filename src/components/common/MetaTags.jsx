import React from 'react'
import { Helmet } from 'react-helmet-async'

const MetaTags = ({
  title = "[اسم المؤسسة التعليمية] - تعليم عالي معتمد",
  description = "[اسم المؤسسة التعليمية] - أفضل معهد تعليم عالي في [الدولة]. تخصصات إدارة الأعمال، المحاسبة والمراجعة، ونظم معلومات الأعمال. أكثر من [عدد الطلاب] طالب و[سنوات الخبرة] سنة خبرة.",
  keywords = "[اسم المؤسسة], [المدينة], إدارة الأعمال, المحاسبة والمراجعة, نظم معلومات الأعمال, تعليم عالي, معهد معتمد, [المدينة], [الدولة], دراسة, تخصصات, جامعة, كلية, تعليم",
  ogImage = "[رابط الموقع]/images/og-image.jpg",
  canonical = "[رابط الموقع]"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="[اسم المؤسسة التعليمية]" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Arabic" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Enhanced SEO Meta Tags */}
      <meta name="application-name" content="[اسم المؤسسة التعليمية]" />
      <meta name="apple-mobile-web-app-title" content="[اسم المؤسسة]" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-tooltip" content="[اسم المؤسسة التعليمية]" />
      <meta name="msapplication-starturl" content="/" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="format-detection" content="telephone=no" />

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="[كود الدولة-كود المدينة]" />
      <meta name="geo.placename" content="[المدينة], [الدولة]" />
      <meta name="geo.position" content="[خط الطول];[خط العرض]" />
      <meta name="ICBM" content="[خط الطول], [خط العرض]" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="[اسم المؤسسة التعليمية]" />
      <meta property="og:site_name" content="[اسم المؤسسة التعليمية]" />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:alt" content="[اسم المؤسسة التعليمية]" />
      <meta name="twitter:creator" content="@[حساب_المؤسسة]" />
      <meta name="twitter:site" content="@[حساب_المؤسسة]" />
      <meta name="twitter:domain" content="[نطاق الموقع]" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="ar" href={canonical} />
      <link rel="alternate" hrefLang="en" href={`${canonical}/en/`} />
      <link rel="alternate" hrefLang="x-default" href="https://obieda-hussien.github.io/EIA/" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "[اسم المؤسسة التعليمية]",
          "alternateName": "[Institution Name in English]",
          "url": "[رابط الموقع]",
          "logo": "[رابط الموقع]/images/logo.png",
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "[عنوان الشارع]",
            "addressLocality": "[المدينة]",
            "addressRegion": "[المنطقة]",
            "postalCode": "[الرمز البريدي]",
            "addressCountry": "[كود الدولة]"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "[خط العرض]",
            "longitude": "[خط الطول]"
          },
          "telephone": "[رقم الهاتف]",
          "email": "[البريد الإلكتروني]",
          "foundingDate": "[سنة التأسيس]",
          "numberOfStudents": "[عدد الطلاب]+",
          "sameAs": [
            "[رابط الفيسبوك]",
            "[رابط تويتر]",
            "[رابط لينكد إن]"
          ]
        })}
      </script>

      {/* Structured Data - Educational Programs */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "[اسم التخصص الأول]",
          "description": "[وصف التخصص الأول]",
          "provider": {
            "@type": "EducationalOrganization",
            "name": "[اسم المؤسسة التعليمية]"
          },
          "courseMode": "full-time",
          "educationalLevel": "Higher Education"
        })}
      </script>

      {/* Google Analytics (Replace with your tracking ID) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_TRACKING_ID');
        `}
      </script>
    </Helmet>
  )
}

export default MetaTags