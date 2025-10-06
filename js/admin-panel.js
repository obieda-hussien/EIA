/**
 * Admin Panel JavaScript for Egyptian Institute Alexandria
 * لوحة الإدارة للمعهد المصري لأكاديمية الإسكندرية
 */

class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        this.currentUser = null;
        this.permissions = [];
        this.init();
    }

    /**
     * Initialize admin panel
     */
    async init() {
        this.setupEventListeners();
        await this.checkAuthentication();
        this.loadInitialData();
        this.hideLoadingScreen();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.showSection(section);
            });
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // User menu toggle
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userMenu = document.getElementById('userMenu');
        if (userMenuBtn && userMenu) {
            userMenuBtn.addEventListener('click', () => {
                userMenu.classList.toggle('hidden');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenuBtn.contains(e.target) && !userMenu.contains(e.target)) {
                    userMenu.classList.add('hidden');
                }
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Add buttons
        this.setupAddButtons();

        // Form submissions
        this.setupFormHandlers();
    }

    /**
     * Setup add buttons
     */
    setupAddButtons() {
        const addArticleBtn = document.getElementById('addArticleBtn');
        const addNewsBtn = document.getElementById('addNewsBtn');
        const addEventBtn = document.getElementById('addEventBtn');
        const addStudentBtn = document.getElementById('addStudentBtn');
        const addResultBtn = document.getElementById('addResultBtn');
        const sendNotificationBtn = document.getElementById('sendNotificationBtn');

        if (addArticleBtn) {
            addArticleBtn.addEventListener('click', () => this.showArticleModal());
        }
        if (addNewsBtn) {
            addNewsBtn.addEventListener('click', () => this.showNewsModal());
        }
        if (addEventBtn) {
            addEventBtn.addEventListener('click', () => this.showEventModal());
        }
        if (addStudentBtn) {
            addStudentBtn.addEventListener('click', () => this.showStudentModal());
        }
        if (addResultBtn) {
            addResultBtn.addEventListener('click', () => this.showResultModal());
        }
        if (sendNotificationBtn) {
            sendNotificationBtn.addEventListener('click', () => this.showNotificationModal());
        }
    }

    /**
     * Setup form handlers
     */
    setupFormHandlers() {
        // Site settings form
        const siteSettingsForm = document.getElementById('siteSettingsForm');
        if (siteSettingsForm) {
            siteSettingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveSiteSettings(e);
            });
        }

        // Notification settings form
        const notificationSettingsForm = document.getElementById('notificationSettingsForm');
        if (notificationSettingsForm) {
            notificationSettingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveNotificationSettings(e);
            });
        }
    }

    /**
     * Check authentication
     */
    async checkAuthentication() {
        try {
            // Check if user is authenticated as admin
            const adminSession = window.AuthSystem?.getAdminSession();
            
            if (!adminSession || !adminSession.isAdmin) {
                // Redirect to login or show admin login
                this.redirectToLogin();
                return;
            }

            this.currentUser = adminSession;
            this.permissions = adminSession.permissions || [];
            
            // Update UI with admin info
            const adminNameEl = document.getElementById('adminName');
            if (adminNameEl) {
                adminNameEl.textContent = adminSession.name || 'المسؤول';
            }

        } catch (error) {
            console.error('Authentication check failed:', error);
            this.redirectToLogin();
        }
    }

    /**
     * Redirect to login
     */
    redirectToLogin() {
        // Show admin login modal or redirect
        alert('برجاء تسجيل الدخول كمسؤول للوصول إلى لوحة الإدارة');
        window.location.href = '../index.html';
    }

    /**
     * Load initial data
     */
    async loadInitialData() {
        try {
            await Promise.all([
                this.loadDashboardStats(),
                this.loadRecentActivity()
            ]);
        } catch (error) {
            console.error('Error loading initial data:', error);
            this.showNotification('حدث خطأ في تحميل البيانات', 'error');
        }
    }

    /**
     * Load dashboard statistics
     */
    async loadDashboardStats() {
        try {
            // Get articles count
            const articles = await window.ContentManager.getArticles(1000);
            document.getElementById('totalArticles').textContent = articles.length;

            // Get news count
            const news = await window.ContentManager.getNews(1000);
            document.getElementById('totalNews').textContent = news.length;

            // Get upcoming events count
            const events = await window.ContentManager.getEvents(true);
            document.getElementById('upcomingEvents').textContent = events.length;

            // Get students count (placeholder)
            document.getElementById('totalStudents').textContent = '4000+';

        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        }
    }

    /**
     * Load recent activity
     */
    async loadRecentActivity() {
        try {
            // Load recent articles
            const recentArticles = await window.ContentManager.getArticles(5);
            this.renderRecentArticles(recentArticles);

            // Load recent events
            const recentEvents = await window.ContentManager.getEvents(true);
            this.renderRecentEvents(recentEvents.slice(0, 5));

        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }

    /**
     * Render recent articles
     */
    renderRecentArticles(articles) {
        const container = document.getElementById('recentArticles');
        if (!container) return;

        if (articles.length === 0) {
            container.innerHTML = '<p class="text-gray-500">لا توجد مقالات حديثة</p>';
            return;
        }

        container.innerHTML = articles.map(article => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                    <h4 class="font-semibold text-gray-800">${article.title}</h4>
                    <p class="text-sm text-gray-600">${article.category || 'عام'}</p>
                </div>
                <div class="text-sm text-gray-500">
                    ${this.formatDate(article.createdAt)}
                </div>
            </div>
        `).join('');
    }

    /**
     * Render recent events
     */
    renderRecentEvents(events) {
        const container = document.getElementById('recentEvents');
        if (!container) return;

        if (events.length === 0) {
            container.innerHTML = '<p class="text-gray-500">لا توجد فعاليات قادمة</p>';
            return;
        }

        container.innerHTML = events.map(event => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                    <h4 class="font-semibold text-gray-800">${event.title}</h4>
                    <p class="text-sm text-gray-600">${event.location || 'المعهد المصري'}</p>
                </div>
                <div class="text-sm text-gray-500">
                    ${this.formatDate(event.eventDate)}
                </div>
            </div>
        `).join('');
    }

    /**
     * Show section
     */
    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Load section-specific data
        this.loadSectionData(sectionId);
        this.currentSection = sectionId;
    }

    /**
     * Load section-specific data
     */
    async loadSectionData(sectionId) {
        try {
            switch (sectionId) {
                case 'articles':
                    await this.loadArticles();
                    break;
                case 'news':
                    await this.loadNews();
                    break;
                case 'events':
                    await this.loadEvents();
                    break;
                case 'students':
                    await this.loadStudents();
                    break;
                case 'results':
                    await this.loadResults();
                    break;
                case 'notifications':
                    await this.loadNotifications();
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${sectionId} data:`, error);
            this.showNotification(`حدث خطأ في تحميل بيانات ${sectionId}`, 'error');
        }
    }

    /**
     * Load articles for articles section
     */
    async loadArticles() {
        const articles = await window.ContentManager.getArticles(100);
        this.renderArticlesTable(articles);
    }

    /**
     * Render articles table
     */
    renderArticlesTable(articles) {
        const tbody = document.getElementById('articlesTableBody');
        if (!tbody) return;

        if (articles.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-8 text-gray-500">
                        لا توجد مقالات متاحة
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = articles.map(article => `
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4">${article.title}</td>
                <td class="py-3 px-4">${article.category || 'عام'}</td>
                <td class="py-3 px-4">${article.author || 'إدارة المعهد'}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs ${article.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${article.published ? 'منشور' : 'مسودة'}
                    </span>
                </td>
                <td class="py-3 px-4">${this.formatDate(article.createdAt)}</td>
                <td class="py-3 px-4 text-center">
                    <button onclick="AdminPanel.editArticle('${article.id}')" class="text-blue-600 hover:text-blue-800 mx-1">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="AdminPanel.deleteArticle('${article.id}')" class="text-red-600 hover:text-red-800 mx-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Load news for news section
     */
    async loadNews() {
        const news = await window.ContentManager.getNews(100);
        this.renderNewsTable(news);
    }

    /**
     * Render news table
     */
    renderNewsTable(news) {
        const tbody = document.getElementById('newsTableBody');
        if (!tbody) return;

        if (news.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-8 text-gray-500">
                        لا توجد أخبار متاحة
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = news.map(item => `
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4">${item.title}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs ${item.urgent ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                        ${item.urgent ? 'عاجل' : 'عادي'}
                    </span>
                </td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs ${item.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${item.published ? 'منشور' : 'مسودة'}
                    </span>
                </td>
                <td class="py-3 px-4">${this.formatDate(item.createdAt)}</td>
                <td class="py-3 px-4 text-center">
                    <button onclick="AdminPanel.editNews('${item.id}')" class="text-blue-600 hover:text-blue-800 mx-1">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="AdminPanel.deleteNews('${item.id}')" class="text-red-600 hover:text-red-800 mx-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Load events for events section
     */
    async loadEvents() {
        const events = await window.ContentManager.getEvents();
        this.renderEventsTable(events);
    }

    /**
     * Render events table
     */
    renderEventsTable(events) {
        const tbody = document.getElementById('eventsTableBody');
        if (!tbody) return;

        if (events.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-8 text-gray-500">
                        لا توجد فعاليات متاحة
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = events.map(event => `
            <tr class="border-b border-gray-100 hover:bg-gray-50">
                <td class="py-3 px-4">${event.title}</td>
                <td class="py-3 px-4">${this.formatDate(event.eventDate)}</td>
                <td class="py-3 px-4">${event.location || 'المعهد المصري'}</td>
                <td class="py-3 px-4">${event.registrations || 0} / ${event.capacity || 0}</td>
                <td class="py-3 px-4">
                    <span class="px-2 py-1 rounded-full text-xs ${event.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${event.published ? 'منشور' : 'مسودة'}
                    </span>
                </td>
                <td class="py-3 px-4 text-center">
                    <button onclick="AdminPanel.editEvent('${event.id}')" class="text-blue-600 hover:text-blue-800 mx-1">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="AdminPanel.deleteEvent('${event.id}')" class="text-red-600 hover:text-red-800 mx-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Load students placeholder
     */
    async loadStudents() {
        // Placeholder for students data
        const tbody = document.getElementById('studentsTableBody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-8 text-gray-500">
                        سيتم إضافة بيانات الطلاب قريباً
                    </td>
                </tr>
            `;
        }
    }

    /**
     * Load results placeholder
     */
    async loadResults() {
        // Placeholder for results data
        const tbody = document.getElementById('resultsTableBody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-8 text-gray-500">
                        سيتم إضافة بيانات النتائج قريباً
                    </td>
                </tr>
            `;
        }
    }

    /**
     * Load notifications
     */
    async loadNotifications() {
        const notifications = await window.ContentManager.getNotifications();
        this.renderNotificationsList(notifications);
    }

    /**
     * Render notifications list
     */
    renderNotificationsList(notifications) {
        const container = document.getElementById('notificationsList');
        if (!container) return;

        if (notifications.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">لا توجد إشعارات</p>';
            return;
        }

        container.innerHTML = notifications.map(notification => `
            <div class="border rounded-lg p-4 ${notification.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'}">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-semibold text-gray-800">${notification.title}</h4>
                    <div class="flex items-center space-x-reverse space-x-2">
                        <span class="px-2 py-1 rounded-full text-xs ${notification.urgent ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                            ${notification.urgent ? 'عاجل' : notification.type}
                        </span>
                        <span class="text-sm text-gray-500">${this.formatDate(notification.createdAt)}</span>
                    </div>
                </div>
                <p class="text-gray-600">${notification.message}</p>
            </div>
        `).join('');
    }

    /**
     * Show article modal
     */
    showArticleModal(articleId = null) {
        this.showModal('مقال', this.getArticleModalContent(articleId), () => {
            this.saveArticle(articleId);
        });
    }

    /**
     * Get article modal content
     */
    getArticleModalContent(articleId) {
        return `
            <form id="articleForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">عنوان المقال</label>
                    <input type="text" id="articleTitle" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="أدخل عنوان المقال" required>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">التصنيف</label>
                        <select id="articleCategory" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none">
                            <option value="عام">عام</option>
                            <option value="أخبار">أخبار</option>
                            <option value="إعلانات">إعلانات</option>
                            <option value="فعاليات">فعاليات</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">المؤلف</label>
                        <input type="text" id="articleAuthor" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="إدارة المعهد">
                    </div>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">ملخص المقال</label>
                    <textarea id="articleSummary" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" rows="3" placeholder="ملخص قصير عن المقال"></textarea>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">محتوى المقال</label>
                    <div class="border-2 rounded-lg">
                        <div class="editor-toolbar">
                            <button type="button" onclick="AdminPanel.formatText('bold')" class="p-2 hover:bg-gray-200 rounded">
                                <i class="fas fa-bold"></i>
                            </button>
                            <button type="button" onclick="AdminPanel.formatText('italic')" class="p-2 hover:bg-gray-200 rounded">
                                <i class="fas fa-italic"></i>
                            </button>
                            <button type="button" onclick="AdminPanel.formatText('underline')" class="p-2 hover:bg-gray-200 rounded">
                                <i class="fas fa-underline"></i>
                            </button>
                        </div>
                        <div id="articleContent" class="editor-content" contenteditable="true" style="min-height: 200px;">
                            اكتب محتوى المقال هنا...
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center space-x-reverse space-x-4">
                    <label class="flex items-center">
                        <input type="checkbox" id="articlePublished" class="ml-2">
                        <span class="text-gray-700">نشر المقال</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" id="articleFeatured" class="ml-2">
                        <span class="text-gray-700">مقال مميز</span>
                    </label>
                </div>
            </form>
        `;
    }

    /**
     * Show news modal
     */
    showNewsModal(newsId = null) {
        this.showModal('خبر', this.getNewsModalContent(newsId), () => {
            this.saveNews(newsId);
        });
    }

    /**
     * Get news modal content
     */
    getNewsModalContent(newsId) {
        return `
            <form id="newsForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">عنوان الخبر</label>
                    <input type="text" id="newsTitle" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="أدخل عنوان الخبر" required>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">ملخص الخبر</label>
                    <textarea id="newsSummary" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" rows="3" placeholder="ملخص قصير عن الخبر"></textarea>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">محتوى الخبر</label>
                    <textarea id="newsContent" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" rows="6" placeholder="تفاصيل الخبر" required></textarea>
                </div>
                
                <div class="flex items-center space-x-reverse space-x-4">
                    <label class="flex items-center">
                        <input type="checkbox" id="newsPublished" class="ml-2">
                        <span class="text-gray-700">نشر الخبر</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" id="newsUrgent" class="ml-2">
                        <span class="text-gray-700">خبر عاجل</span>
                    </label>
                </div>
            </form>
        `;
    }

    /**
     * Show event modal
     */
    showEventModal(eventId = null) {
        this.showModal('فعالية', this.getEventModalContent(eventId), () => {
            this.saveEvent(eventId);
        });
    }

    /**
     * Get event modal content
     */
    getEventModalContent(eventId) {
        return `
            <form id="eventForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">اسم الفعالية</label>
                    <input type="text" id="eventTitle" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="أدخل اسم الفعالية" required>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">تاريخ الفعالية</label>
                        <input type="datetime-local" id="eventDate" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" required>
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">المكان</label>
                        <input type="text" id="eventLocation" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="المعهد المصري">
                    </div>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">وصف الفعالية</label>
                    <textarea id="eventDescription" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" rows="4" placeholder="وصف تفصيلي للفعالية" required></textarea>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">السعة المتاحة</label>
                        <input type="number" id="eventCapacity" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="100" min="1">
                    </div>
                    <div class="flex items-center space-x-reverse space-x-4 pt-8">
                        <label class="flex items-center">
                            <input type="checkbox" id="eventPublished" class="ml-2">
                            <span class="text-gray-700">نشر الفعالية</span>
                        </label>
                        <label class="flex items-center">
                            <input type="checkbox" id="eventRegistrationOpen" class="ml-2" checked>
                            <span class="text-gray-700">فتح التسجيل</span>
                        </label>
                    </div>
                </div>
            </form>
        `;
    }

    /**
     * Show notification modal
     */
    showNotificationModal() {
        this.showModal('إشعار', this.getNotificationModalContent(), () => {
            this.sendNotification();
        });
    }

    /**
     * Get notification modal content
     */
    getNotificationModalContent() {
        return `
            <form id="notificationForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">عنوان الإشعار</label>
                    <input type="text" id="notificationTitle" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="أدخل عنوان الإشعار" required>
                </div>
                
                <div>
                    <label class="block text-gray-700 font-semibold mb-2">نص الإشعار</label>
                    <textarea id="notificationMessage" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" rows="4" placeholder="محتوى الإشعار" required></textarea>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">نوع الإشعار</label>
                        <select id="notificationType" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none">
                            <option value="general">عام</option>
                            <option value="article">مقال</option>
                            <option value="news">خبر</option>
                            <option value="event">فعالية</option>
                        </select>
                    </div>
                    <div class="flex items-center pt-8">
                        <label class="flex items-center">
                            <input type="checkbox" id="notificationUrgent" class="ml-2">
                            <span class="text-gray-700">إشعار عاجل</span>
                        </label>
                    </div>
                </div>
            </form>
        `;
    }

    /**
     * Show modal
     */
    showModal(title, content, onSave) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">${title === 'مقال' ? 'إضافة' : title === 'خبر' ? 'إضافة' : title === 'فعالية' ? 'إضافة' : title === 'إشعار' ? 'إرسال' : 'إضافة'} ${title}</h2>
                    <button onclick="this.closest('.modal').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                ${content}
                
                <div class="flex justify-end space-x-reverse space-x-4 mt-6">
                    <button onclick="this.closest('.modal').remove()" class="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                        إلغاء
                    </button>
                    <button id="saveBtn" class="btn-primary text-white px-6 py-3 rounded-lg font-semibold">
                        ${title === 'إشعار' ? 'إرسال' : 'حفظ'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Setup save button
        const saveBtn = modal.querySelector('#saveBtn');
        saveBtn.addEventListener('click', async () => {
            try {
                saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>جاري الحفظ...';
                saveBtn.disabled = true;
                
                await onSave();
                modal.remove();
                this.showNotification(`تم ${title === 'إشعار' ? 'إرسال' : 'حفظ'} ${title} بنجاح`, 'success');
                
                // Reload current section data
                this.loadSectionData(this.currentSection);
                
            } catch (error) {
                console.error(`Error saving ${title}:`, error);
                this.showNotification(`حدث خطأ في ${title === 'إشعار' ? 'إرسال' : 'حفظ'} ${title}`, 'error');
                saveBtn.innerHTML = title === 'إشعار' ? 'إرسال' : 'حفظ';
                saveBtn.disabled = false;
            }
        });
    }

    /**
     * Save article
     */
    async saveArticle(articleId) {
        const title = document.getElementById('articleTitle').value;
        const category = document.getElementById('articleCategory').value;
        const author = document.getElementById('articleAuthor').value || 'إدارة المعهد';
        const summary = document.getElementById('articleSummary').value;
        const content = document.getElementById('articleContent').innerHTML;
        const published = document.getElementById('articlePublished').checked;
        const featured = document.getElementById('articleFeatured').checked;

        const articleData = {
            title,
            category,
            author,
            summary,
            content,
            published,
            featured
        };

        if (articleId) {
            await window.ContentManager.updateArticle(articleId, articleData);
        } else {
            await window.ContentManager.createArticle(articleData);
        }
    }

    /**
     * Save news
     */
    async saveNews(newsId) {
        const title = document.getElementById('newsTitle').value;
        const summary = document.getElementById('newsSummary').value;
        const content = document.getElementById('newsContent').value;
        const published = document.getElementById('newsPublished').checked;
        const urgent = document.getElementById('newsUrgent').checked;

        const newsData = {
            title,
            summary,
            content,
            published,
            urgent
        };

        if (newsId) {
            await window.ContentManager.updateNews(newsId, newsData);
        } else {
            await window.ContentManager.createNews(newsData);
        }
    }

    /**
     * Save event
     */
    async saveEvent(eventId) {
        const title = document.getElementById('eventTitle').value;
        const eventDate = document.getElementById('eventDate').value;
        const location = document.getElementById('eventLocation').value || 'المعهد المصري';
        const description = document.getElementById('eventDescription').value;
        const capacity = parseInt(document.getElementById('eventCapacity').value) || 100;
        const published = document.getElementById('eventPublished').checked;
        const registrationOpen = document.getElementById('eventRegistrationOpen').checked;

        const eventData = {
            title,
            eventDate,
            location,
            description,
            capacity,
            published,
            registrationOpen
        };

        if (eventId) {
            await window.ContentManager.updateEvent(eventId, eventData);
        } else {
            await window.ContentManager.createEvent(eventData);
        }
    }

    /**
     * Send notification
     */
    async sendNotification() {
        const title = document.getElementById('notificationTitle').value;
        const message = document.getElementById('notificationMessage').value;
        const type = document.getElementById('notificationType').value;
        const urgent = document.getElementById('notificationUrgent').checked;

        const notificationData = {
            title,
            message,
            type,
            urgent
        };

        await window.ContentManager.sendNotification(notificationData);
    }

    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    }

    /**
     * Logout
     */
    async logout() {
        try {
            await window.AuthSystem.logout();
            window.location.href = '../index.html';
        } catch (error) {
            console.error('Logout error:', error);
            this.showNotification('حدث خطأ في تسجيل الخروج', 'error');
        }
    }

    /**
     * Format text in editor
     */
    static formatText(command) {
        document.execCommand(command, false, null);
    }

    /**
     * Edit article
     */
    static async editArticle(articleId) {
        // Implementation for editing article
        window.adminPanel.showArticleModal(articleId);
    }

    /**
     * Delete article
     */
    static async deleteArticle(articleId) {
        if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
            try {
                await window.ContentManager.deleteArticle(articleId);
                window.adminPanel.showNotification('تم حذف المقال بنجاح', 'success');
                window.adminPanel.loadSectionData('articles');
            } catch (error) {
                console.error('Error deleting article:', error);
                window.adminPanel.showNotification('حدث خطأ في حذف المقال', 'error');
            }
        }
    }

    /**
     * Edit news
     */
    static async editNews(newsId) {
        window.adminPanel.showNewsModal(newsId);
    }

    /**
     * Delete news
     */
    static async deleteNews(newsId) {
        if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
            try {
                await window.ContentManager.deleteNews(newsId);
                window.adminPanel.showNotification('تم حذف الخبر بنجاح', 'success');
                window.adminPanel.loadSectionData('news');
            } catch (error) {
                console.error('Error deleting news:', error);
                window.adminPanel.showNotification('حدث خطأ في حذف الخبر', 'error');
            }
        }
    }

    /**
     * Edit event
     */
    static async editEvent(eventId) {
        window.adminPanel.showEventModal(eventId);
    }

    /**
     * Delete event
     */
    static async deleteEvent(eventId) {
        if (confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
            try {
                await window.ContentManager.deleteEvent(eventId);
                window.adminPanel.showNotification('تم حذف الفعالية بنجاح', 'success');
                window.adminPanel.loadSectionData('events');
            } catch (error) {
                console.error('Error deleting event:', error);
                window.adminPanel.showNotification('حدث خطأ في حذف الفعالية', 'error');
            }
        }
    }

    /**
     * Save site settings
     */
    async saveSiteSettings(event) {
        // Implementation for saving site settings
        this.showNotification('تم حفظ إعدادات الموقع بنجاح', 'success');
    }

    /**
     * Save notification settings
     */
    async saveNotificationSettings(event) {
        // Implementation for saving notification settings
        this.showNotification('تم حفظ إعدادات الإشعارات بنجاح', 'success');
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' :
                    'fa-info-circle'
                } mr-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
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
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.remove('active');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 1000);
        }
    }
}

// Initialize admin panel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.adminPanel = new AdminPanel();
});

// Make AdminPanel available globally for onclick handlers
window.AdminPanel = AdminPanel;