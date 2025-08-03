/**
 * Authentication System for Egyptian Institute Alexandria
 * نظام المصادقة للمعهد المصري لأكاديمية الإسكندرية
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAdmin = false;
        this.setupAuthListeners();
    }

    /**
     * Setup authentication state listeners
     */
    setupAuthListeners() {
        if (firebaseAuth) {
            firebaseAuth.onAuthStateChanged((user) => {
                this.currentUser = user;
                this.updateAuthUI();
                
                if (user) {
                    this.checkAdminStatus(user);
                } else {
                    this.isAdmin = false;
                }
            });
        }
    }

    /**
     * Check if user is admin
     * @param {object} user - Firebase user object
     */
    async checkAdminStatus(user) {
        try {
            const adminDoc = await firebaseDb.collection('admins').doc(user.uid).get();
            this.isAdmin = adminDoc.exists;
            this.updateAuthUI();
        } catch (error) {
            console.error('Error checking admin status:', error);
            this.isAdmin = false;
        }
    }

    /**
     * Student login with student code and national ID last 5 digits
     * @param {string} studentCode - Student code from ID card
     * @param {string} nationalIdLast5 - Last 5 digits of national ID
     * @returns {Promise<object>} Login result
     */
    async studentLogin(studentCode, nationalIdLast5) {
        try {
            // Validate input
            if (!studentCode || !nationalIdLast5) {
                throw new Error('برجاء إدخال كود الطالب وآخر 5 أرقام من الرقم القومي');
            }

            if (nationalIdLast5.length !== 5) {
                throw new Error('آخر 5 أرقام من الرقم القومي يجب أن تكون 5 أرقام');
            }

            // Check if student exists in database
            const studentQuery = await firebaseDb.collection('students')
                .where('studentCode', '==', studentCode.toUpperCase())
                .where('nationalIdLast5', '==', nationalIdLast5)
                .get();

            if (studentQuery.empty) {
                throw new Error('بيانات الطالب غير صحيحة. برجاء التأكد من كود الطالب وآخر 5 أرقام من الرقم القومي');
            }

            const studentData = studentQuery.docs[0].data();
            
            // Create anonymous authentication session for the student
            await firebaseAuth.signInAnonymously();
            
            // Store student data in local storage
            const studentSession = {
                studentCode: studentData.studentCode,
                studentName: studentData.name,
                department: studentData.department,
                year: studentData.year,
                loginTime: new Date().toISOString(),
                isStudent: true
            };
            
            localStorage.setItem('studentSession', JSON.stringify(studentSession));
            
            // Trigger custom event
            window.dispatchEvent(new CustomEvent('studentLoggedIn', { 
                detail: studentSession 
            }));

            return {
                success: true,
                student: studentData,
                message: `أهلاً وسهلاً ${studentData.name}`
            };

        } catch (error) {
            console.error('Student login error:', error);
            throw error;
        }
    }

    /**
     * Admin login with email and password
     * @param {string} email - Admin email
     * @param {string} password - Admin password
     * @returns {Promise<object>} Login result
     */
    async adminLogin(email, password) {
        try {
            if (!email || !password) {
                throw new Error('برجاء إدخال البريد الإلكتروني وكلمة المرور');
            }

            const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Check if user is admin
            const adminDoc = await firebaseDb.collection('admins').doc(user.uid).get();
            
            if (!adminDoc.exists) {
                await this.logout();
                throw new Error('غير مصرح لك بالدخول إلى لوحة الإدارة');
            }

            const adminData = adminDoc.data();
            
            // Store admin session
            const adminSession = {
                uid: user.uid,
                email: user.email,
                name: adminData.name,
                role: adminData.role,
                permissions: adminData.permissions || [],
                loginTime: new Date().toISOString(),
                isAdmin: true
            };
            
            localStorage.setItem('adminSession', JSON.stringify(adminSession));
            
            // Trigger custom event
            window.dispatchEvent(new CustomEvent('adminLoggedIn', { 
                detail: adminSession 
            }));

            return {
                success: true,
                admin: adminData,
                message: `أهلاً وسهلاً ${adminData.name}`
            };

        } catch (error) {
            console.error('Admin login error:', error);
            throw error;
        }
    }

    /**
     * Logout current user
     * @returns {Promise<boolean>} Logout success
     */
    async logout() {
        try {
            // Clear sessions
            localStorage.removeItem('studentSession');
            localStorage.removeItem('adminSession');
            
            // Sign out from Firebase
            if (firebaseAuth.currentUser) {
                await firebaseAuth.signOut();
            }
            
            // Trigger custom events
            window.dispatchEvent(new CustomEvent('userLoggedOut'));
            
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }

    /**
     * Get current student session
     * @returns {object|null} Student session data
     */
    getStudentSession() {
        try {
            const session = localStorage.getItem('studentSession');
            return session ? JSON.parse(session) : null;
        } catch (error) {
            console.error('Error getting student session:', error);
            return null;
        }
    }

    /**
     * Get current admin session
     * @returns {object|null} Admin session data
     */
    getAdminSession() {
        try {
            const session = localStorage.getItem('adminSession');
            return session ? JSON.parse(session) : null;
        } catch (error) {
            console.error('Error getting admin session:', error);
            return null;
        }
    }

    /**
     * Check if user is logged in as student
     * @returns {boolean} Student login status
     */
    isStudentLoggedIn() {
        const session = this.getStudentSession();
        return !!session && session.isStudent;
    }

    /**
     * Check if user is logged in as admin
     * @returns {boolean} Admin login status
     */
    isAdminLoggedIn() {
        const session = this.getAdminSession();
        return !!session && session.isAdmin;
    }

    /**
     * Check if user has specific permission
     * @param {string} permission - Permission to check
     * @returns {boolean} Permission status
     */
    hasPermission(permission) {
        const adminSession = this.getAdminSession();
        if (!adminSession || !adminSession.permissions) {
            return false;
        }
        
        return adminSession.permissions.includes(permission) || 
               adminSession.permissions.includes('all');
    }

    /**
     * Update authentication UI
     */
    updateAuthUI() {
        const studentSession = this.getStudentSession();
        const adminSession = this.getAdminSession();
        
        // Update login button
        const loginBtn = document.getElementById('loginBtn');
        const userInfo = document.getElementById('userInfo');
        const adminPanel = document.getElementById('adminPanelBtn');
        
        if (studentSession) {
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <i class="fas fa-user mr-2"></i>
                    ${studentSession.studentName}
                `;
                loginBtn.onclick = () => this.showUserMenu();
            }
            
            if (userInfo) {
                userInfo.innerHTML = `
                    <div class="text-sm text-gray-600">
                        مرحباً ${studentSession.studentName} - ${studentSession.department}
                    </div>
                `;
                userInfo.classList.remove('hidden');
            }
        } else if (adminSession) {
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <i class="fas fa-user-shield mr-2"></i>
                    ${adminSession.name}
                `;
                loginBtn.onclick = () => this.showAdminMenu();
            }
            
            if (adminPanel) {
                adminPanel.classList.remove('hidden');
            }
        } else {
            if (loginBtn) {
                loginBtn.innerHTML = `
                    <i class="fas fa-sign-in-alt mr-2"></i>
                    تسجيل الدخول
                `;
                loginBtn.onclick = () => this.showLoginModal();
            }
            
            if (userInfo) {
                userInfo.classList.add('hidden');
            }
            
            if (adminPanel) {
                adminPanel.classList.add('hidden');
            }
        }
    }

    /**
     * Show login modal
     */
    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
        } else {
            this.createLoginModal();
        }
    }

    /**
     * Create login modal
     */
    createLoginModal() {
        const modalHTML = `
            <div id="loginModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl max-w-md w-full p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">تسجيل الدخول</h2>
                        <button onclick="AuthSystem.closeLoginModal()" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="mb-6">
                        <div class="flex space-x-reverse space-x-2 mb-4">
                            <button id="studentTabBtn" class="flex-1 py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold" onclick="AuthSystem.switchTab('student')">
                                طالب
                            </button>
                            <button id="adminTabBtn" class="flex-1 py-2 px-4 rounded-lg bg-gray-200 text-gray-700 font-semibold" onclick="AuthSystem.switchTab('admin')">
                                إدارة
                            </button>
                        </div>
                        
                        <!-- Student Login Form -->
                        <form id="studentLoginForm" class="space-y-4">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">كود الطالب</label>
                                <input type="text" id="studentCode" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="أدخل كود الطالب من البطاقة" required>
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">آخر 5 أرقام من الرقم القومي</label>
                                <input type="text" id="nationalIdLast5" maxlength="5" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="مثال: 12345" required>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                <i class="fas fa-sign-in-alt mr-2"></i>
                                دخول
                            </button>
                        </form>
                        
                        <!-- Admin Login Form -->
                        <form id="adminLoginForm" class="space-y-4 hidden">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">البريد الإلكتروني</label>
                                <input type="email" id="adminEmail" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="admin@eia.edu.eg" required>
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">كلمة المرور</label>
                                <input type="password" id="adminPassword" class="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" placeholder="كلمة المرور" required>
                            </div>
                            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                <i class="fas fa-sign-in-alt mr-2"></i>
                                دخول الإدارة
                            </button>
                        </form>
                    </div>
                    
                    <div class="text-center text-gray-600 text-sm">
                        <p>لا تملك حساب؟ <a href="#contact" class="text-blue-600 hover:underline" onclick="AuthSystem.closeLoginModal(); showSection('contact')">تواصل معنا</a></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Setup form handlers
        this.setupLoginFormHandlers();
    }

    /**
     * Setup login form handlers
     */
    setupLoginFormHandlers() {
        const studentForm = document.getElementById('studentLoginForm');
        const adminForm = document.getElementById('adminLoginForm');
        
        if (studentForm) {
            studentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleStudentLogin(e);
            });
        }
        
        if (adminForm) {
            adminForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.handleAdminLogin(e);
            });
        }
    }

    /**
     * Handle student login form submission
     * @param {Event} event - Form submit event
     */
    async handleStudentLogin(event) {
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>جاري التحقق...';
            submitBtn.disabled = true;
            
            const studentCode = document.getElementById('studentCode').value.trim();
            const nationalIdLast5 = document.getElementById('nationalIdLast5').value.trim();
            
            const result = await this.studentLogin(studentCode, nationalIdLast5);
            
            if (result.success) {
                this.closeLoginModal();
                this.showSuccess(result.message);
            }
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    /**
     * Handle admin login form submission
     * @param {Event} event - Form submit event
     */
    async handleAdminLogin(event) {
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>جاري التحقق...';
            submitBtn.disabled = true;
            
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value;
            
            const result = await this.adminLogin(email, password);
            
            if (result.success) {
                this.closeLoginModal();
                this.showSuccess(result.message);
            }
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    /**
     * Switch login tab
     * @param {string} tab - Tab name (student/admin)
     */
    static switchTab(tab) {
        const studentTab = document.getElementById('studentTabBtn');
        const adminTab = document.getElementById('adminTabBtn');
        const studentForm = document.getElementById('studentLoginForm');
        const adminForm = document.getElementById('adminLoginForm');
        
        if (tab === 'student') {
            studentTab.classList.add('bg-blue-600', 'text-white');
            studentTab.classList.remove('bg-gray-200', 'text-gray-700');
            adminTab.classList.add('bg-gray-200', 'text-gray-700');
            adminTab.classList.remove('bg-blue-600', 'text-white');
            studentForm.classList.remove('hidden');
            adminForm.classList.add('hidden');
        } else {
            adminTab.classList.add('bg-blue-600', 'text-white');
            adminTab.classList.remove('bg-gray-200', 'text-gray-700');
            studentTab.classList.add('bg-gray-200', 'text-gray-700');
            studentTab.classList.remove('bg-blue-600', 'text-white');
            adminForm.classList.remove('hidden');
            studentForm.classList.add('hidden');
        }
    }

    /**
     * Close login modal
     */
    static closeLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.remove();
        }
    }

    /**
     * Show success message
     * @param {string} message - Success message
     */
    showSuccess(message) {
        // Create and show success notification
        this.showNotification(message, 'success');
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        // Create and show error notification
        this.showNotification(message, 'error');
    }

    /**
     * Show notification
     * @param {string} message - Message to show
     * @param {string} type - Notification type (success/error)
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-600 text-white' :
            type === 'error' ? 'bg-red-600 text-white' :
            'bg-blue-600 text-white'
        }`;
        
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
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Create global instance
window.AuthSystem = new AuthSystem();

// Setup authentication UI when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add login button to header if not exists
    const header = document.querySelector('.top-header .container .flex');
    if (header && !document.getElementById('loginBtn')) {
        const loginButton = document.createElement('button');
        loginButton.id = 'loginBtn';
        loginButton.className = 'bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition';
        loginButton.innerHTML = `
            <i class="fas fa-sign-in-alt mr-2"></i>
            تسجيل الدخول
        `;
        loginButton.onclick = () => window.AuthSystem.showLoginModal();
        
        header.appendChild(loginButton);
    }
    
    // Initialize UI
    window.AuthSystem.updateAuthUI();
});