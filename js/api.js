/**
 * API handlers and data management for EIA Website
 * Handles form submissions, data validation, and local storage
 */

class EIAApiManager {
    constructor() {
        this.baseUrl = window.location.origin;
        this.init();
    }

    init() {
        this.initFormHandlers();
        this.initLocalStorage();
        this.initResultsSystem();
    }

    // Form handling system
    initFormHandlers() {
        // Contact form
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }

        // Results form
        const resultsForm = document.querySelector('#results form');
        if (resultsForm) {
            resultsForm.addEventListener('submit', (e) => this.handleResultsForm(e));
        }

        // Event registration forms
        const eventForms = document.querySelectorAll('#eventRegistrationForm');
        eventForms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleEventRegistration(e));
        });
    }

    // Enhanced contact form handler with validation
    async handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!this.validateContactForm(formData)) {
            return;
        }

        // Show loading state
        this.setLoadingState(submitBtn, 'جاري الإرسال...', true);

        try {
            // Simulate API call
            await this.simulateApiCall(2000);
            
            // Store submission locally
            this.storeContactSubmission({
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            });

            // Show success message
            this.showSuccessMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
            form.reset();

        } catch (error) {
            this.showErrorMessage('حدث خطأ أثناء الإرسال. برجاء المحاولة مرة أخرى.');
        } finally {
            this.setLoadingState(submitBtn, '<i class="fas fa-paper-plane mr-2"></i>إرسال الرسالة', false);
        }
    }

    // Enhanced results form with detailed validation
    async handleResultsForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!this.validateResultsForm(formData)) {
            return;
        }

        this.setLoadingState(submitBtn, 'جاري البحث...', true);

        try {
            // Simulate API call to results system
            await this.simulateApiCall(3000);
            
            // For demo purposes, show a realistic response
            const studentCode = formData.get('studentCode');
            const nationalId = formData.get('nationalId');
            
            if (this.isValidStudentCode(studentCode) && this.isValidNationalId(nationalId)) {
                this.showResultsModal(this.generateMockResults(studentCode));
            } else {
                this.showErrorMessage('لم يتم العثور على بيانات مطابقة. تأكد من صحة البيانات المدخلة.');
            }

        } catch (error) {
            this.showErrorMessage('النظام غير متاح حالياً. برجاء المحاولة لاحقاً أو الاتصال بشؤون الطلاب.');
        } finally {
            this.setLoadingState(submitBtn, '<i class="fas fa-search mr-2"></i>البحث عن النتائج', false);
        }
    }

    // Event registration handler
    async handleEventRegistration(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!this.validateEventRegistration(formData)) {
            return;
        }

        this.setLoadingState(submitBtn, 'جاري التسجيل...', true);

        try {
            await this.simulateApiCall(2000);
            
            // Store registration
            this.storeEventRegistration({
                eventTitle: document.getElementById('eventModalTitle').textContent,
                fullName: formData.get('fullName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                studentCode: formData.get('studentCode'),
                department: formData.get('department'),
                notes: formData.get('notes'),
                timestamp: new Date().toISOString()
            });

            this.showSuccessMessage('تم تسجيلك بنجاح! سيتم التواصل معك قريباً.');
            
            // Close modal
            if (typeof closeEventRegistrationModal === 'function') {
                closeEventRegistrationModal();
            }

        } catch (error) {
            this.showErrorMessage('حدث خطأ أثناء التسجيل. برجاء المحاولة مرة أخرى.');
        } finally {
            this.setLoadingState(submitBtn, '<i class="fas fa-check mr-2"></i>تأكيد التسجيل', false);
        }
    }

    // Form validation methods
    validateContactForm(formData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');

        if (!name || name.length < 2) {
            this.showErrorMessage('برجاء إدخال الاسم كاملاً');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showErrorMessage('برجاء إدخال بريد إلكتروني صحيح');
            return false;
        }

        if (!this.isValidEgyptianPhone(phone)) {
            this.showErrorMessage('برجاء إدخال رقم هاتف مصري صحيح');
            return false;
        }

        if (!message || message.length < 10) {
            this.showErrorMessage('برجاء كتابة رسالة تحتوي على 10 أحرف على الأقل');
            return false;
        }

        return true;
    }

    validateResultsForm(formData) {
        const studentCode = formData.get('studentCode');
        const nationalId = formData.get('nationalId');
        const captcha = formData.get('captcha');
        const expectedCaptcha = document.querySelector('.captcha-box').textContent.trim();

        if (!studentCode) {
            this.showErrorMessage('برجاء إدخال كود الطالب');
            return false;
        }

        if (!nationalId || !this.isValidNationalId(nationalId)) {
            this.showErrorMessage('برجاء إدخال رقم هوية صحيح (14 رقم)');
            return false;
        }

        if (captcha !== expectedCaptcha) {
            this.showErrorMessage('رمز التحقق غير صحيح');
            this.generateCaptcha(); // Generate new captcha
            return false;
        }

        return true;
    }

    validateEventRegistration(formData) {
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const department = formData.get('department');
        const agreeTerms = formData.get('agreeTerms');

        if (!fullName || fullName.length < 3) {
            this.showErrorMessage('برجاء إدخال الاسم كاملاً');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showErrorMessage('برجاء إدخال بريد إلكتروني صحيح');
            return false;
        }

        if (!this.isValidEgyptianPhone(phone)) {
            this.showErrorMessage('برجاء إدخال رقم هاتف صحيح');
            return false;
        }

        if (!department) {
            this.showErrorMessage('برجاء اختيار التخصص أو الوظيفة');
            return false;
        }

        if (!agreeTerms) {
            this.showErrorMessage('برجاء الموافقة على الشروط والأحكام');
            return false;
        }

        return true;
    }

    // Validation helper methods
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidEgyptianPhone(phone) {
        const phoneRegex = /^(\+201|01)[0-9]{9}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }

    isValidNationalId(nationalId) {
        return /^[0-9]{14}$/.test(nationalId);
    }

    isValidStudentCode(studentCode) {
        // Mock validation - in real app this would check against database
        return /^[A-Z]{2}[0-9]{6}$/.test(studentCode) || /^[0-9]{8}$/.test(studentCode);
    }

    // Local storage management
    initLocalStorage() {
        if (!localStorage.getItem('eia_submissions')) {
            localStorage.setItem('eia_submissions', JSON.stringify([]));
        }
        if (!localStorage.getItem('eia_registrations')) {
            localStorage.setItem('eia_registrations', JSON.stringify([]));
        }
    }

    storeContactSubmission(data) {
        const submissions = JSON.parse(localStorage.getItem('eia_submissions') || '[]');
        submissions.push(data);
        localStorage.setItem('eia_submissions', JSON.stringify(submissions));
    }

    storeEventRegistration(data) {
        const registrations = JSON.parse(localStorage.getItem('eia_registrations') || '[]');
        registrations.push(data);
        localStorage.setItem('eia_registrations', JSON.stringify(registrations));
    }

    // Results system
    initResultsSystem() {
        this.generateCaptcha();
        
        // Refresh captcha button
        const refreshBtn = document.getElementById('refreshCaptcha');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.generateCaptcha());
        }
    }

    generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let captcha = '';
        for (let i = 0; i < 5; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        const captchaBox = document.querySelector('.captcha-box');
        if (captchaBox) {
            captchaBox.textContent = captcha;
        }
    }

    generateMockResults(studentCode) {
        return {
            studentInfo: {
                name: 'أحمد محمد علي',
                code: studentCode,
                department: 'إدارة الأعمال',
                year: 'الفرقة الثالثة',
                gpa: '3.8'
            },
            subjects: [
                { name: 'إدارة الموارد البشرية', grade: 'A+', points: 4.0 },
                { name: 'التسويق المتقدم', grade: 'A', points: 3.7 },
                { name: 'المحاسبة الإدارية', grade: 'B+', points: 3.3 },
                { name: 'نظم المعلومات الإدارية', grade: 'A-', points: 3.7 },
                { name: 'إدارة العمليات', grade: 'A', points: 4.0 },
                { name: 'القانون التجاري', grade: 'B+', points: 3.3 }
            ],
            summary: {
                totalCredits: 18,
                earnedCredits: 18,
                gpa: 3.67,
                status: 'ناجح'
            }
        };
    }

    showResultsModal(results) {
        const modal = document.createElement('div');
        modal.className = 'results-modal';
        modal.innerHTML = `
            <div class="results-modal-content">
                <div class="results-header">
                    <h2>نتائج الطالب</h2>
                    <button class="close-results" onclick="this.closest('.results-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="student-info">
                    <h3>بيانات الطالب</h3>
                    <div class="info-grid">
                        <div><strong>الاسم:</strong> ${results.studentInfo.name}</div>
                        <div><strong>كود الطالب:</strong> ${results.studentInfo.code}</div>
                        <div><strong>التخصص:</strong> ${results.studentInfo.department}</div>
                        <div><strong>الفرقة:</strong> ${results.studentInfo.year}</div>
                    </div>
                </div>
                
                <div class="grades-table">
                    <h3>درجات المواد</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>اسم المادة</th>
                                <th>التقدير</th>
                                <th>النقاط</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${results.subjects.map(subject => `
                                <tr>
                                    <td>${subject.name}</td>
                                    <td class="grade-${subject.grade.replace('+', 'plus').replace('-', 'minus')}">${subject.grade}</td>
                                    <td>${subject.points}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="results-summary">
                    <h3>ملخص النتائج</h3>
                    <div class="summary-grid">
                        <div><strong>إجمالي الساعات:</strong> ${results.summary.totalCredits}</div>
                        <div><strong>الساعات المجتازة:</strong> ${results.summary.earnedCredits}</div>
                        <div><strong>المعدل التراكمي:</strong> ${results.summary.gpa}</div>
                        <div><strong>الحالة:</strong> <span class="status-${results.summary.status === 'ناجح' ? 'pass' : 'fail'}">${results.summary.status}</span></div>
                    </div>
                </div>
                
                <div class="results-actions">
                    <button onclick="window.print()" class="btn-print">
                        <i class="fas fa-print"></i> طباعة النتيجة
                    </button>
                    <button onclick="this.closest('.results-modal').remove()" class="btn-close">
                        إغلاق
                    </button>
                </div>
            </div>
        `;

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .results-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 20px;
            }
            
            .results-modal-content {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }
            
            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                padding-bottom: 15px;
                border-bottom: 2px solid #3b82f6;
            }
            
            .close-results {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: #6b7280;
                padding: 5px;
            }
            
            .student-info, .grades-table, .results-summary {
                margin-bottom: 30px;
            }
            
            .info-grid, .summary-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            .grades-table table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
            }
            
            .grades-table th, .grades-table td {
                padding: 12px;
                text-align: right;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .grades-table th {
                background: #f3f4f6;
                font-weight: bold;
            }
            
            .grade-Aplus { color: #059669; font-weight: bold; }
            .grade-A { color: #16a34a; font-weight: bold; }
            .grade-Aminus { color: #65a30d; font-weight: bold; }
            .grade-Bplus { color: #ca8a04; font-weight: bold; }
            .grade-B { color: #d97706; font-weight: bold; }
            .grade-Bminus { color: #ea580c; font-weight: bold; }
            
            .status-pass { color: #059669; font-weight: bold; }
            .status-fail { color: #dc2626; font-weight: bold; }
            
            .results-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
                margin-top: 30px;
            }
            
            .btn-print, .btn-close {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .btn-print {
                background: #3b82f6;
                color: white;
            }
            
            .btn-print:hover {
                background: #2563eb;
            }
            
            .btn-close {
                background: #6b7280;
                color: white;
            }
            
            .btn-close:hover {
                background: #4b5563;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Restore body scroll when modal is closed
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    }

    // UI helper methods
    setLoadingState(button, text, loading) {
        button.disabled = loading;
        button.innerHTML = loading ? `<i class="fas fa-spinner fa-spin mr-2"></i>${text}` : text;
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    min-width: 300px;
                    max-width: 500px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    transform: translateX(100%);
                    animation: slideInNotification 0.3s ease forwards;
                }
                
                @keyframes slideInNotification {
                    to { transform: translateX(0); }
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    gap: 12px;
                }
                
                .notification-success {
                    background: #f0fdf4;
                    border-left: 4px solid #22c55e;
                    color: #15803d;
                }
                
                .notification-error {
                    background: #fef2f2;
                    border-left: 4px solid #ef4444;
                    color: #dc2626;
                }
                
                .notification-info {
                    background: #eff6ff;
                    border-left: 4px solid #3b82f6;
                    color: #1d4ed8;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
                    margin-right: auto;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
                
                @media (max-width: 768px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Utility method to simulate API calls
    simulateApiCall(delay = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, delay);
        });
    }
}

// Initialize API manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.eiaApi = new EIAApiManager();
});

// Export for global use
window.EIAApiManager = EIAApiManager;