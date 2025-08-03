/**
 * Dynamic Content Loader for Egyptian Institute Alexandria
 * محمل المحتوى الديناميكي للمعهد المصري لأكاديمية الإسكندرية
 */

class DynamicContentLoader {
    constructor() {
        this.loadedArticles = [];
        this.loadedNews = [];
        this.loadedEvents = [];
        this.init();
    }

    /**
     * Initialize dynamic content loading
     */
    async init() {
        try {
            // Wait for Firebase to initialize
            await this.waitForFirebase();
            
            // Load initial content
            await this.loadAllContent();
            
            // Setup real-time listeners
            this.setupRealtimeListeners();
            
            console.log('Dynamic content loader initialized successfully');
        } catch (error) {
            console.error('Failed to initialize dynamic content loader:', error);
            // Fallback to static content
            this.useStaticContent();
        }
    }

    /**
     * Wait for Firebase to initialize
     */
    async waitForFirebase() {
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 50;
            
            const checkFirebase = () => {
                attempts++;
                
                if (window.ContentManager && window.firebaseDb) {
                    resolve();
                } else if (attempts >= maxAttempts) {
                    reject(new Error('Firebase initialization timeout'));
                } else {
                    setTimeout(checkFirebase, 100);
                }
            };
            
            checkFirebase();
        });
    }

    /**
     * Load all content from Firebase
     */
    async loadAllContent() {
        try {
            await Promise.all([
                this.loadArticles(),
                this.loadNews(),
                this.loadEvents(),
                this.loadNotifications()
            ]);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    /**
     * Load articles from Firebase
     */
    async loadArticles() {
        try {
            const articles = await window.ContentManager.getArticles(10);
            const publishedArticles = articles.filter(article => article.published);
            
            this.loadedArticles = publishedArticles;
            this.updateArticlesInUI();
            
        } catch (error) {
            console.error('Error loading articles:', error);
            this.useStaticArticles();
        }
    }

    /**
     * Load news from Firebase
     */
    async loadNews() {
        try {
            const news = await window.ContentManager.getNews(10);
            const publishedNews = news.filter(item => item.published);
            
            this.loadedNews = publishedNews;
            this.updateNewsInUI();
            
        } catch (error) {
            console.error('Error loading news:', error);
            this.useStaticNews();
        }
    }

    /**
     * Load events from Firebase
     */
    async loadEvents() {
        try {
            const events = await window.ContentManager.getEvents(true); // upcoming events only
            const publishedEvents = events.filter(event => event.published);
            
            this.loadedEvents = publishedEvents;
            this.updateEventsInUI();
            
        } catch (error) {
            console.error('Error loading events:', error);
            this.useStaticEvents();
        }
    }

    /**
     * Load notifications from Firebase
     */
    async loadNotifications() {
        try {
            const notifications = await window.ContentManager.getNotifications(5);
            this.updateNotificationsInUI(notifications);
            
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    }

    /**
     * Update articles in UI
     */
    updateArticlesInUI() {
        if (this.loadedArticles.length === 0) {
            this.useStaticArticles();
            return;
        }

        // Update news section articles
        const newsSection = document.querySelector('#news .grid');
        if (newsSection) {
            const articlesHTML = this.loadedArticles.slice(0, 3).map(article => this.createArticleHTML(article)).join('');
            newsSection.innerHTML = articlesHTML;
        }

        // Update home section latest news
        const homeNewsSection = document.querySelector('#home .grid.md\\:grid-cols-3');
        if (homeNewsSection) {
            const homeArticlesHTML = this.loadedArticles.slice(0, 3).map(article => this.createHomeArticleHTML(article)).join('');
            homeNewsSection.innerHTML = homeArticlesHTML;
        }
    }

    /**
     * Update news in UI
     */
    updateNewsInUI() {
        if (this.loadedNews.length === 0) {
            this.useStaticNews();
            return;
        }

        // Update news section if exists
        const newsContainer = document.querySelector('#newsContainer');
        if (newsContainer) {
            const newsHTML = this.loadedNews.map(news => this.createNewsHTML(news)).join('');
            newsContainer.innerHTML = newsHTML;
        }
    }

    /**
     * Update events in UI
     */
    updateEventsInUI() {
        if (this.loadedEvents.length === 0) {
            this.useStaticEvents();
            return;
        }

        // Update events section if exists
        const eventsContainer = document.querySelector('#eventsContainer');
        if (eventsContainer) {
            const eventsHTML = this.loadedEvents.map(event => this.createEventHTML(event)).join('');
            eventsContainer.innerHTML = eventsHTML;
        }
    }

    /**
     * Update notifications in UI
     */
    updateNotificationsInUI(notifications) {
        // Create notifications bar if urgent notifications exist
        const urgentNotifications = notifications.filter(n => n.urgent);
        
        if (urgentNotifications.length > 0) {
            this.showUrgentNotifications(urgentNotifications);
        }
    }

    /**
     * Create article HTML
     */
    createArticleHTML(article) {
        const date = this.formatDate(article.createdAt);
        const summary = article.summary || this.truncateText(article.content, 100);
        
        return `
            <div class="news-card p-6 cursor-pointer" onclick="openDynamicArticleModal('${article.id}')">
                <div class="w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg mb-6 flex items-center justify-center">
                    <i class="fas ${this.getCategoryIcon(article.category)} text-white text-4xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">${article.title}</h3>
                <p class="text-gray-600 mb-4">${summary}</p>
                <div class="flex items-center text-blue-600">
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span class="text-sm">${date}</span>
                </div>
                ${article.featured ? '<div class="mt-2"><span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">مميز</span></div>' : ''}
            </div>
        `;
    }

    /**
     * Create home article HTML
     */
    createHomeArticleHTML(article) {
        const date = this.formatDate(article.createdAt);
        const summary = article.summary || this.truncateText(article.content, 80);
        
        return `
            <div class="news-card p-6 cursor-pointer" onclick="openDynamicArticleModal('${article.id}')">
                <div class="w-full h-48 bg-gradient-to-r ${this.getCategoryGradient(article.category)} rounded-lg mb-6 flex items-center justify-center">
                    <i class="fas ${this.getCategoryIcon(article.category)} text-white text-4xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3">${article.title}</h3>
                <p class="text-gray-600 mb-4">${summary}</p>
                <div class="flex items-center ${this.getCategoryColor(article.category)}">
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span class="text-sm">${date}</span>
                </div>
            </div>
        `;
    }

    /**
     * Create news HTML
     */
    createNewsHTML(news) {
        const date = this.formatDate(news.createdAt);
        
        return `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-xl font-bold text-gray-800">${news.title}</h3>
                    ${news.urgent ? '<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">عاجل</span>' : ''}
                </div>
                <p class="text-gray-600 mb-4">${news.summary || this.truncateText(news.content, 120)}</p>
                <div class="text-sm text-gray-500">${date}</div>
            </div>
        `;
    }

    /**
     * Create event HTML
     */
    createEventHTML(event) {
        const eventDate = this.formatDate(event.eventDate);
        
        return `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold text-gray-800 mb-3">${event.title}</h3>
                <p class="text-gray-600 mb-4">${this.truncateText(event.description, 100)}</p>
                <div class="space-y-2 text-sm text-gray-600">
                    <div><i class="fas fa-calendar mr-2"></i>${eventDate}</div>
                    <div><i class="fas fa-map-marker-alt mr-2"></i>${event.location}</div>
                    <div><i class="fas fa-users mr-2"></i>${event.registrations || 0} / ${event.capacity} مشارك</div>
                </div>
                <div class="mt-4">
                    <button onclick="openEventRegistration('${event.id}')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        سجل الآن
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Show urgent notifications
     */
    showUrgentNotifications(notifications) {
        const notificationBar = document.createElement('div');
        notificationBar.id = 'urgentNotificationBar';
        notificationBar.className = 'fixed top-0 left-0 right-0 bg-red-600 text-white p-3 z-50 text-center';
        notificationBar.innerHTML = `
            <div class="container mx-auto flex items-center justify-between">
                <div>
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    <strong>إشعار عاجل:</strong> ${notifications[0].message}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.prepend(notificationBar);
        
        // Adjust body padding to account for notification bar
        document.body.style.paddingTop = '60px';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (notificationBar.parentNode) {
                notificationBar.remove();
                document.body.style.paddingTop = '0';
            }
        }, 10000);
    }

    /**
     * Setup real-time listeners
     */
    setupRealtimeListeners() {
        if (!window.ContentManager || !window.firebaseRtdb) return;

        // Listen for new notifications
        window.ContentManager.onNotifications((snapshot) => {
            const notification = snapshot.val();
            if (notification && notification.urgent) {
                this.showRealtimeNotification(notification);
            }
        });
    }

    /**
     * Show real-time notification
     */
    showRealtimeNotification(notification) {
        const notificationEl = document.createElement('div');
        notificationEl.className = 'fixed top-20 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
        notificationEl.innerHTML = `
            <div class="flex items-start">
                <i class="fas fa-bell text-yellow-300 mr-2 mt-1"></i>
                <div class="flex-1">
                    <h4 class="font-bold">${notification.title}</h4>
                    <p class="text-sm mt-1">${notification.message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200 ml-2">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notificationEl);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            if (notificationEl.parentNode) {
                notificationEl.remove();
            }
        }, 8000);
    }

    /**
     * Get category icon
     */
    getCategoryIcon(category) {
        const icons = {
            'أخبار': 'fa-newspaper',
            'إعلانات': 'fa-bullhorn',
            'فعاليات': 'fa-calendar-alt',
            'تخرج': 'fa-graduation-cap',
            'إنجاز': 'fa-trophy',
            'شراكة': 'fa-handshake'
        };
        return icons[category] || 'fa-file-alt';
    }

    /**
     * Get category gradient
     */
    getCategoryGradient(category) {
        const gradients = {
            'أخبار': 'from-blue-400 to-blue-600',
            'إعلانات': 'from-green-400 to-green-600',
            'فعاليات': 'from-purple-400 to-purple-600',
            'تخرج': 'from-yellow-400 to-yellow-600',
            'إنجاز': 'from-red-400 to-red-600',
            'شراكة': 'from-indigo-400 to-indigo-600'
        };
        return gradients[category] || 'from-gray-400 to-gray-600';
    }

    /**
     * Get category color
     */
    getCategoryColor(category) {
        const colors = {
            'أخبار': 'text-blue-600',
            'إعلانات': 'text-green-600',
            'فعاليات': 'text-purple-600',
            'تخرج': 'text-yellow-600',
            'إنجاز': 'text-red-600',
            'شراكة': 'text-indigo-600'
        };
        return colors[category] || 'text-gray-600';
    }

    /**
     * Format date
     */
    formatDate(date) {
        if (!date) return 'غير محدد';
        
        const dateObj = date.toDate ? date.toDate() : new Date(date);
        return dateObj.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Truncate text
     */
    truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    /**
     * Use static content fallback
     */
    useStaticContent() {
        console.log('Using static content as fallback');
        // Keep existing static content
    }

    /**
     * Use static articles fallback
     */
    useStaticArticles() {
        console.log('Using static articles as fallback');
        // Keep existing static articles
    }

    /**
     * Use static news fallback
     */
    useStaticNews() {
        console.log('Using static news as fallback');
        // Keep existing static news
    }

    /**
     * Use static events fallback
     */
    useStaticEvents() {
        console.log('Using static events as fallback');
        // Keep existing static events
    }
}

/**
 * Open dynamic article modal
 */
async function openDynamicArticleModal(articleId) {
    try {
        const article = await window.ContentManager.getArticle(articleId);
        if (!article) {
            console.error('Article not found');
            return;
        }

        // Update article view count
        await window.ContentManager.updateArticle(articleId, {
            views: (article.views || 0) + 1
        });

        // Use existing modal functionality but with dynamic content
        document.getElementById('articleModalTitle').textContent = article.title;
        document.getElementById('articleModalContent').innerHTML = `
            <div class="prose max-w-none">
                ${article.imageUrl ? `<img src="${article.imageUrl}" alt="${article.title}" class="w-full rounded-lg mb-6">` : ''}
                
                <div class="mb-6">
                    <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2">
                        ${article.category || 'عام'}
                    </span>
                    <span class="text-gray-500 text-sm">
                        بواسطة ${article.author || 'إدارة المعهد'}
                    </span>
                </div>
                
                <div class="text-lg leading-relaxed text-gray-700">
                    ${article.content}
                </div>
                
                <div class="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
                    <div class="flex items-center justify-between">
                        <span>المشاهدات: ${(article.views || 0) + 1}</span>
                        <span>تاريخ النشر: ${window.DynamicContentLoader ? new DynamicContentLoader().formatDate(article.createdAt) : 'غير محدد'}</span>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('articleDate').textContent = window.DynamicContentLoader ? 
            new DynamicContentLoader().formatDate(article.createdAt) : 'غير محدد';
        document.getElementById('articleModal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');

    } catch (error) {
        console.error('Error opening article modal:', error);
        alert('حدث خطأ في تحميل المقال');
    }
}

/**
 * Enhanced event registration with Firebase
 */
async function openEventRegistration(eventId) {
    try {
        const event = await window.ContentManager.getEvent(eventId);
        if (!event) {
            // Use alert instead of console.error to avoid logging system conflicts
            alert('عذراً، الفعالية غير موجودة أو غير متاحة حالياً');
            return;
        }

        // Check if event is full
        if (event.registrations >= event.capacity) {
            alert('عذراً، الفعالية مكتملة العدد');
            return;
        }

        // Check if registration is open
        if (!event.registrationOpen) {
            alert('عذراً، التسجيل في هذه الفعالية مغلق حالياً');
            return;
        }

        // Use existing event registration modal but with dynamic content
        const existingModal = document.getElementById('eventRegistrationModal');
        if (existingModal) {
            document.getElementById('eventModalTitle').textContent = `تسجيل في ${event.title}`;
            
            const eventDetails = `
                <div class="mb-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-3">${event.title}</h3>
                    <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div><i class="fas fa-calendar mr-2"></i><strong>التاريخ:</strong> ${window.DynamicContentLoader ? new DynamicContentLoader().formatDate(event.eventDate) : 'غير محدد'}</div>
                        <div><i class="fas fa-map-marker-alt mr-2"></i><strong>المكان:</strong> ${event.location}</div>
                        <div><i class="fas fa-users mr-2"></i><strong>المتاح:</strong> ${event.capacity - (event.registrations || 0)} مقعد</div>
                        <div><i class="fas fa-clock mr-2"></i><strong>حالة التسجيل:</strong> ${event.registrationOpen ? 'مفتوح' : 'مغلق'}</div>
                    </div>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="text-blue-800">${event.description}</p>
                </div>
            `;
            
            document.getElementById('eventModalContent').innerHTML = eventDetails;
            
            // Override form submission to save to Firebase
            const form = document.getElementById('eventRegistrationForm');
            form.onsubmit = async (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>جاري التسجيل...';
                submitBtn.disabled = true;
                
                try {
                    const formData = new FormData(form);
                    const registrationData = {
                        fullName: formData.get('fullName'),
                        phone: formData.get('phone'),
                        email: formData.get('email'),
                        studentCode: formData.get('studentCode'),
                        department: formData.get('department'),
                        notes: formData.get('notes')
                    };
                    
                    await window.ContentManager.registerForEvent(eventId, registrationData);
                    
                    alert(`تم تسجيلك بنجاح في ${event.title}!\n\nسيتم التواصل معك قريباً على البريد الإلكتروني أو الهاتف المسجل.\n\nشكراً لك!`);
                    closeEventRegistrationModal();
                    
                } catch (error) {
                    // Handle registration errors more gracefully
                    let errorMessage = 'حدث خطأ في التسجيل. برجاء المحاولة مرة أخرى.';
                    if (error.message.includes('Event is full')) {
                        errorMessage = 'عذراً، الفعالية مكتملة العدد';
                    } else if (error.message.includes('Event not found')) {
                        errorMessage = 'عذراً، الفعالية غير موجودة';
                    }
                    alert(errorMessage);
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            };
            
            existingModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }

    } catch (error) {
        // Handle event loading errors more gracefully
        let errorMessage = 'حدث خطأ في تحميل بيانات الفعالية';
        if (error.message && error.message.includes('not found')) {
            errorMessage = 'عذراً، الفعالية غير موجودة أو غير متاحة حالياً';
        }
        alert(errorMessage);
    }
}

// Initialize dynamic content loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.DynamicContentLoader = new DynamicContentLoader();
});

// Export for global use
window.openDynamicArticleModal = openDynamicArticleModal;
window.openEventRegistration = openEventRegistration;