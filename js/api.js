// API Configuration and Services
class EIAApiService {
    constructor() {
        this.baseUrl = 'https://egyptian-institute-alexandria.edu.eg/api/';
        this.googleMapsKey = 'AIzaSyDOCD_U6CEJlzCXF6YPAmHCN8gKZoB3X_k'; // يجب استبدالها بالمفتاح الحقيقي
        this.emailjsConfig = {
            serviceId: 'service_eia',
            templateId: 'template_contact',
            publicKey: 'your_public_key'
        };
    }

    // تحميل Google Maps API
    async loadGoogleMaps() {
        return new Promise((resolve, reject) => {
            if (window.google && window.google.maps) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Google Maps'));
            
            document.head.appendChild(script);
        });
    }

    // إرسال بيانات النموذج
    async submitForm(formData, formType) {
        try {
            // محاكاة API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // في التطبيق الحقيقي، سيتم إرسال البيانات للخادم
            console.log(`Submitting ${formType} form:`, formData);
            
            return {
                success: true,
                message: 'تم الإرسال بنجاح'
            };
        } catch (error) {
            console.error('Form submission error:', error);
            return {
                success: false,
                message: 'حدث خطأ في الإرسال'
            };
        }
    }

    // البحث في النتائج
    async searchResults(studentCode, nationalId) {
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // محاكاة البحث في قاعدة البيانات
            const mockResults = {
                '12345': {
                    name: 'أحمد محمد علي',
                    department: 'إدارة الأعمال',
                    year: 'الرابعة',
                    gpa: '3.85',
                    status: 'ناجح',
                    subjects: [
                        { name: 'إدارة التسويق', grade: 'A', points: 4.0 },
                        { name: 'المحاسبة المالية', grade: 'B+', points: 3.5 },
                        { name: 'إدارة الموارد البشرية', grade: 'A-', points: 3.7 }
                    ]
                }
            };

            if (mockResults[studentCode]) {
                return {
                    success: true,
                    data: mockResults[studentCode]
                };
            } else {
                return {
                    success: false,
                    message: 'لم يتم العثور على النتائج'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'خطأ في البحث'
            };
        }
    }

    // جلب الأخبار والفعاليات
    async getNews() {
        try {
            // محاكاة جلب الأخبار من API
            const mockNews = [
                {
                    id: 1,
                    title: 'حفل تخرج الدفعة الجديدة 2024',
                    summary: 'مبروك لكل الخريجين الجدد! احتفلنا مع أكتر من 500 خريج وخريجة...',
                    date: '2024-06-15',
                    image: '/images/graduation.jpg',
                    category: 'تخرج'
                },
                {
                    id: 2,
                    title: 'ورشة عمل في ريادة الأعمال',
                    summary: 'ورشة مجانية لكل الطلاب عن إزاي تبدأ مشروعك الخاص...',
                    date: '2024-07-20',
                    image: '/images/workshop.jpg',
                    category: 'ورشة عمل'
                }
            ];

            return {
                success: true,
                data: mockNews
            };
        } catch (error) {
            return {
                success: false,
                message: 'خطأ في جلب الأخبار'
            };
        }
    }

    // تحليلات الموقع
    async trackEvent(eventName, eventData) {
        try {
            // Google Analytics 4 tracking
            if (window.gtag) {
                gtag('event', eventName, eventData);
            }

            // Facebook Pixel tracking
            if (window.fbq) {
                fbq('track', eventName, eventData);
            }

            console.log('Event tracked:', eventName, eventData);
        } catch (error) {
            console.error('Analytics tracking error:', error);
        }
    }

    // تحسين SEO - إضافة structured data
    addStructuredData(type, data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }
}

// إنشاء instance عامة
window.eiaApi = new EIAApiService();