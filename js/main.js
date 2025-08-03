// Main JavaScript functionality for EIA website
class EIAMain {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = false;
        this.init();
    }

    init() {
        this.initEventListeners();
        this.initFormHandlers();
        this.initSEOEnhancements();
        this.initPerformanceOptimizations();
        this.initAccessibilityFeatures();
        this.initAnalytics();
    }

    // تهيئة event listeners
    initEventListeners() {
        // التنقل في القائمة الجانبية
        document.addEventListener('click', (e) => {
            if (e.target.matches('.sidebar-nav-item[href^="#"]')) {
                e.preventDefault();
                const sectionId = e.target.getAttribute('href').substring(1);
                this.showSection(sectionId);
                this.closeSidebar();
            }
        });

        // إغلاق القائمة الجانبية عند النقر خارجها
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                this.closeSidebar();
            }
        });

        // التنقل بالكيبورد
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // تتبع scroll للتأثيرات المختلفة
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));

        // تحديث النافذة عند تغيير الحجم
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // تتبع hash changes للتنقل المباشر
        window.addEventListener('hashchange', this.handleHashChange.bind(this));

        // تحميل lenient للصور
        this.initLazyLoading();
    }

    // معالجة النماذج
    initFormHandlers() {
        // نموذج الاتصال
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactForm.bind(this));
        }

        // نموذج البحث في النتائج
        const resultsForm = document.querySelector('#results form');
        if (resultsForm) {
            resultsForm.addEventListener('submit', this.handleResultsForm.bind(this));
        }

        // نموذج تسجيل الأحداث
        const eventForm = document.getElementById('eventRegistrationForm');
        if (eventForm) {
            eventForm.addEventListener('submit', this.handleEventRegistration.bind(this));
        }

        // التحقق من صحة البيانات في الوقت الفعلي
        this.initRealTimeValidation();
    }

    // تحسينات SEO
    initSEOEnhancements() {
        // إضافة structured data ديناميكياً
        this.addDynamicStructuredData();
        
        // تحديث meta tags عند تغيير الصفحة
        this.updateMetaTags();
        
        // إضافة breadcrumbs
        this.addBreadcrumbs();
        
        // تحسين internal linking
        this.enhanceInternalLinks();
        
        // إضافة JSON-LD للأحداث والأخبار
        this.addEventStructuredData();
    }

    // تحسينات الأداء
    initPerformanceOptimizations() {
        // تحميل الموارد بشكل منفصل
        this.preloadCriticalResources();
        
        // تحسين الصور
        this.optimizeImages();
        
        // Service Worker للتخزين المؤقت
        this.registerServiceWorker();
        
        // Resource hints
        this.addResourceHints();
    }

    // ميزات إمكانية الوصول
    initAccessibilityFeatures() {
        // Skip links
        this.addSkipLinks();
        
        // ARIA attributes
        this.enhanceARIA();
        
        // Focus management
        this.initFocusManagement();
        
        // Screen reader optimizations
        this.optimizeForScreenReaders();
    }

    // تحليلات وتتبع
    initAnalytics() {
        // Google Analytics 4
        this.initGA4();
        
        // تتبع الأحداث المخصصة
        this.trackCustomEvents();
        
        // تتبع الأداء
        this.trackPerformance();
        
        // تتبع الأخطاء
        this.trackErrors();
    }

    // عرض قسم محدد
    showSection(sectionId) {
        // إخفاء جميع الأقسام
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('section-active');
            section.classList.add('section-hidden');
        });

        // عرض القسم المحدد
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('section-hidden');
            targetSection.classList.add('section-active');
            
            // تحديث التنقل
            this.updateNavigation(sectionId);
            
            // تحديث URL
            this.updateURL(sectionId);
            
            // تحديث meta tags
            this.updateSectionMetaTags(sectionId);
            
            // تتبع في Analytics
            this.trackPageView(sectionId);
            
            // التمرير لأعلى
            this.scrollToTop();
            
            this.currentSection = sectionId;
        }
    }

    // تحديث التنقل
    updateNavigation(sectionId) {
        document.querySelectorAll('.sidebar-nav-item').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.sidebar-nav-item[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // تحديث URL
    updateURL(sectionId) {
        const newURL = `${window.location.origin}${window.location.pathname}#${sectionId}`;
        window.history.pushState({ section: sectionId }, '', newURL);
    }

    // إغلاق القائمة الجانبية
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // فتح القائمة الجانبية
    openSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // معالجة keyboard navigation
    handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            this.closeSidebar();
            this.closeAllModals();
        }
        
        if (e.ctrlKey && e.key === 'm') {
            e.preventDefault();
            this.toggleSidebar();
        }

        // تنقل سريع بالأرقام
        if (e.altKey && e.key >= '1' && e.key <= '7') {
            e.preventDefault();
            const sections = ['home', 'about', 'departments', 'admissions', 'results', 'news', 'contact'];
            const sectionIndex = parseInt(e.key) - 1;
            if (sections[sectionIndex]) {
                this.showSection(sections[sectionIndex]);
            }
        }
    }

    // معالجة التمرير
    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // تحديث شريط التقدم
        this.updateProgressBar(scrollTop);
        
        // تأثيرات parallax
        this.updateParallaxEffects(scrollTop);
        
        // إظهار/إخفاء زر العودة لأعلى
        this.toggleBackToTop(scrollTop);
        
        // تحديث navigation عند التمرير
        this.updateScrollNavigation(scrollTop);
    }

    // معالجة تغيير حجم النافذة
    handleResize() {
        // تحديث الخريطة
        if (window.eiaGoogleMaps) {
            window.eiaGoogleMaps.resize();
        }
        
        // تحديث الأنيميشن
        if (window.genZAnimations) {
            window.genZAnimations.handleResize();
        }
        
        // إغلاق القائمة الجانبية على الشاشات الكبيرة
        if (window.innerWidth > 1024) {
            this.closeSidebar();
        }
    }

    // معالجة hash changes
    handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            this.showSection(hash);
        }
    }

    // معالجة نموذج الاتصال
    async handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // عرض حالة التحميل
        this.showFormLoading(submitBtn, 'جاري الإرسال...');
        
        try {
            // محاكاة إرسال النموذج
            const result = await window.eiaApi.submitForm(formData, 'contact');
            
            if (result.success) {
                this.showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                form.reset();
                
                // تتبع في Analytics
                window.eiaApi.trackEvent('form_submit', {
                    form_type: 'contact'
                });
            } else {
                this.showErrorMessage(result.message);
            }
        } catch (error) {
            console.error('Contact form error:', error);
            this.showErrorMessage('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.');
        } finally {
            this.hideFormLoading(submitBtn, 'إرسال الرسالة');
        }
    }

    // معالجة نموذج النتائج
    async handleResultsForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        const studentCode = formData.get('studentCode');
        const nationalId = formData.get('nationalId');
        
        this.showFormLoading(submitBtn, 'جاري البحث...');
        
        try {
            const result = await window.eiaApi.searchResults(studentCode, nationalId);
            
            if (result.success) {
                this.displayResults(result.data);
                
                // تتبع في Analytics
                window.eiaApi.trackEvent('results_search', {
                    search_type: 'student_results'
                });
            } else {
                this.showErrorMessage(result.message);
            }
        } catch (error) {
            console.error('Results search error:', error);
            this.showErrorMessage('حدث خطأ في البحث. يرجى المحاولة مرة أخرى.');
        } finally {
            this.hideFormLoading(submitBtn, 'بحث');
        }
    }

    // عرض النتائج
    displayResults(data) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'results-display glass-effect p-6 rounded-2xl mt-6';
        resultsContainer.innerHTML = `
            <h3 class="text-2xl font-bold text-green-800 mb-4">✅ نتائج الطالب</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-bold text-gray-800 mb-2">البيانات الأساسية</h4>
                    <div class="space-y-2">
                        <p><strong>الاسم:</strong> ${data.name}</p>
                        <p><strong>التخصص:</strong> ${data.department}</p>
                        <p><strong>السنة الدراسية:</strong> ${data.year}</p>
                        <p><strong>المعدل التراكمي:</strong> <span class="text-green-600 font-bold">${data.gpa}</span></p>
                        <p><strong>الحالة:</strong> <span class="text-green-600 font-bold">${data.status}</span></p>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-gray-800 mb-2">درجات المواد</h4>
                    <div class="space-y-2">
                        ${data.subjects.map(subject => `
                            <div class="flex justify-between items-center">
                                <span>${subject.name}</span>
                                <span class="font-bold text-blue-600">${subject.grade}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // إدراج النتائج بعد النموذج
        const resultsSection = document.querySelector('#results .container');
        const existingResults = resultsSection.querySelector('.results-display');
        if (existingResults) {
            existingResults.remove();
        }
        resultsSection.appendChild(resultsContainer);
        
        // التمرير للنتائج
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // إضافة structured data ديناميكياً
    addDynamicStructuredData() {
        const organizationData = {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "المعهد المصري لأكاديمية الإسكندرية للإدارة والمحاسبة",
            "alternateName": "Egyptian Institute for Alexandria Academy",
            "url": window.location.origin,
            "logo": `${window.location.origin}/images/logo.png`,
            "description": "أفضل معهد تعليم عالي في مصر. تخصصات إدارة الأعمال، المحاسبة والمراجعة، ونظم معلومات الأعمال.",
            "foundingDate": "1996",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "3 شارع الملك، أمام محطة قطار المنتزه",
                "addressLocality": "الإسكندرية",
                "addressRegion": "الإسكندرية",
                "postalCode": "21500",
                "addressCountry": "EG"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 31.2001,
                "longitude": 29.9187
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+2016000",
                "contactType": "customer service",
                "availableLanguage": ["Arabic", "English"]
            },
            "sameAs": [
                "https://www.facebook.com/AlexAcademyEIA",
                "https://x.com/alexacademyeia",
                "https://eg.linkedin.com/in/saad-hendy-363a3324b"
            ]
        };

        window.eiaApi.addStructuredData('organization', organizationData);
    }

    // تحديث meta tags للقسم
    updateSectionMetaTags(sectionId) {
        const sectionTitles = {
            home: 'المعهد المصري لأكاديمية الإسكندرية - الصفحة الرئيسية',
            about: 'عن المعهد المصري - تاريخ وإنجازات 28 سنة',
            departments: 'التخصصات والأقسام - إدارة أعمال ومحاسبة ونظم معلومات',
            admissions: 'شروط القبول والتسجيل - المعهد المصري',
            results: 'نتائج الطلاب - الاستعلام عن الدرجات',
            news: 'الأخبار والفعاليات - آخر أخبار المعهد',
            contact: 'تواصل معنا - المعهد المصري الإسكندرية'
        };

        const sectionDescriptions = {
            home: 'المعهد المصري لأكاديمية الإسكندرية - 28 سنة من التميز في التعليم العالي. أكثر من 4000 طالب في إدارة الأعمال والمحاسبة ونظم المعلومات.',
            about: 'تعرف على تاريخ المعهد المصري منذ التأسيس عام 1996. رؤيتنا ورسالتنا وإنجازاتنا في مجال التعليم العالي بالإسكندرية.',
            departments: 'تخصصات المعهد المصري: إدارة الأعمال، المحاسبة والمراجعة، نظم معلومات الأعمال. برامج معتمدة وفرص عمل مضمونة.',
            admissions: 'شروط القبول والتسجيل في المعهد المصري. المستندات المطلوبة ومواعيد التقديم للعام الدراسي الجديد.',
            results: 'استعلم عن نتائجك الدراسية في المعهد المصري. خدمة الاستعلام عن الدرجات والمعدل التراكمي للطلاب.',
            news: 'آخر أخبار وفعاليات المعهد المصري. حفلات التخرج وورش العمل والأنشطة الطلابية والإنجازات الأكاديمية.',
            contact: 'تواصل مع المعهد المصري - العنوان وأرقام الهواتف ومواعيد العمل. خريطة الموقع في شارع الملك بالإسكندرية.'
        };

        // تحديث title
        document.title = sectionTitles[sectionId] || document.title;

        // تحديث meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = sectionDescriptions[sectionId] || metaDescription.content;
        }

        // تحديث Open Graph
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.content = sectionTitles[sectionId] || ogTitle.content;
        }

        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.content = sectionDescriptions[sectionId] || ogDescription.content;
        }

        // تحديث canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.href = `${window.location.origin}${window.location.pathname}#${sectionId}`;
        }
    }

    // تهيئة Google Analytics 4
    initGA4() {
        if (window.gtag) {
            // تتبع الصفحة الحالية
            gtag('config', 'GA_TRACKING_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    // تتبع عرض الصفحة
    trackPageView(sectionId) {
        if (window.gtag) {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: `/#${sectionId}`
            });
        }
    }

    // تتبع الأحداث المخصصة
    trackCustomEvents() {
        // تتبع النقر على أزرار CTA
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                if (window.gtag) {
                    gtag('event', 'cta_click', {
                        event_category: 'engagement',
                        event_label: btn.textContent.trim()
                    });
                }
            });
        });

        // تتبع مشاهدة الأقسام
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (window.gtag && sectionId) {
                        gtag('event', 'section_view', {
                            event_category: 'engagement',
                            event_label: sectionId
                        });
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section[id]').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Utility functions
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // عرض رسائل النجاح والخطأ
    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 400px;
            font-family: 'Cairo', sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInRight 0.3s ease;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }

    showFormLoading(button, text) {
        button.disabled = true;
        button.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>${text}`;
    }

    hideFormLoading(button, originalText) {
        button.disabled = false;
        button.innerHTML = originalText;
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // تهيئة تحميل منتظر للصور
    initLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    closeAllModals() {
        document.querySelectorAll('.modal, .fixed.inset-0').forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.classList.remove('overflow-hidden');
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('active')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }
}

// إضافة CSS للتوست والتأثيرات
const mainStyles = document.createElement('style');
mainStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .toast {
        animation: slideInRight 0.3s ease;
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .lazy.loaded {
        opacity: 1;
    }

    /* تحسينات إضافية للتمرير السلس */
    html {
        scroll-behavior: smooth;
    }

    /* تحسين التركيز للوصولية */
    .focus-visible {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }

    /* تحسينات للطباعة */
    @media print {
        .sidebar, .menu-toggle, .floating-shape {
            display: none !important;
        }
        
        .section-hidden {
            display: block !important;
        }
        
        * {
            animation: none !important;
            transition: none !important;
        }
    }
`;

document.head.appendChild(mainStyles);

// تهيئة التطبيق الرئيسي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.eiaMain = new EIAMain();
    
    // تهيئة الصفحة حسب hash الحالي
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        window.eiaMain.showSection(hash);
    } else {
        window.eiaMain.showSection('home');
    }
    
    console.log('EIA Main application initialized successfully');
});