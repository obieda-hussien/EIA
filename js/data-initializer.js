/**
 * Sample Data Initializer for Egyptian Institute Alexandria
 * منشئ البيانات التجريبية للمعهد المصري لأكاديمية الإسكندرية
 */

class DataInitializer {
    constructor() {
        this.initialized = false;
    }

    /**
     * Initialize sample data
     */
    async initializeSampleData() {
        if (this.initialized) {
            console.log('Sample data already initialized');
            return;
        }

        try {
            console.log('Initializing sample data...');
            
            await Promise.all([
                this.createSampleArticles(),
                this.createSampleNews(),
                this.createSampleEvents(),
                this.createSampleStudents(),
                this.createSampleResults(),
                this.createSampleAdmin()
            ]);

            this.initialized = true;
            console.log('Sample data initialized successfully');
            
        } catch (error) {
            console.error('Error initializing sample data:', error);
        }
    }

    /**
     * Create sample articles
     */
    async createSampleArticles() {
        const articles = [
            {
                title: 'احتفالية تخرج الدفعة 28 من المعهد المصري',
                content: `
                    <p>في احتفالية مميزة ومليئة بالفرحة والاعتزاز، احتفل المعهد المصري لأكاديمية الإسكندرية بتخرج الدفعة الثامنة والعشرين من طلابه وطالباته، والذين بلغ عددهم أكثر من 500 خريج وخريجة في مختلف التخصصات.</p>
                    
                    <h3>تفاصيل الحفل</h3>
                    <p>أقيم الحفل في قاعة المؤتمرات الكبرى بالمعهد، وحضره الأستاذ الدكتور مدير المعهد، وأعضاء هيئة التدريس، وأولياء أمور الطلاب، بالإضافة إلى عدد من الشخصيات المهمة في المجتمع المحلي.</p>
                    
                    <h3>كلمة مدير المعهد</h3>
                    <p>وفي كلمته، أشاد مدير المعهد بمستوى الطلاب المتميز وتفوقهم الأكاديمي، مؤكداً أن هذه الدفعة تمثل نموذجاً رائعاً لما يمكن تحقيقه من خلال الجد والاجتهاد والتطوير المستمر للمناهج التعليمية.</p>
                `,
                summary: 'احتفل المعهد المصري بتخرج أكتر من 500 خريج وخريجة من الدفعة الـ 28 في احتفالية مميزة حضرها كبار المسؤولين وأهالي الطلاب',
                category: 'تخرج',
                author: 'إدارة المعهد',
                published: true,
                featured: true
            },
            {
                title: 'المعهد المصري يحصل على جائزة التميز للعام الثالث',
                content: `
                    <p>في إنجاز جديد يُضاف إلى سجل المعهد المصري لأكاديمية الإسكندرية، حصل المعهد على جائزة أفضل معهد تعليمي في محافظة الإسكندرية للعام الثالث على التوالي، وذلك خلال المؤتمر السنوي للتعليم العالي.</p>
                    
                    <h3>معايير التقييم</h3>
                    <p>استندت لجنة التحكيم في قرارها إلى عدة معايير مهمة، منها جودة التعليم، مستوى الخريجين، البحث العلمي، والأنشطة الطلابية، بالإضافة إلى معدلات التوظيف للخريجين.</p>
                `,
                summary: 'حصل المعهد المصري على جائزة أفضل معهد تعليمي في محافظة الإسكندرية للعام الثالث على التوالي',
                category: 'إنجاز',
                author: 'إدارة المعهد',
                published: true,
                featured: false
            },
            {
                title: 'شراكة استراتيجية جديدة مع كبرى الشركات',
                content: `
                    <p>وقع المعهد المصري لأكاديمية الإسكندرية بروتوكولات تعاون مع مجموعة من أكبر الشركات في محافظة الإسكندرية، بهدف تدريب الطلاب وتوفير فرص عمل مضمونة للخريجين.</p>
                    
                    <h3>الشركات المشاركة</h3>
                    <ul>
                        <li>مجموعة شركات الإسكندرية للاستثمار</li>
                        <li>شركة دلتا للتكنولوجيا</li>
                        <li>مجموعة البحر المتوسط للخدمات المالية</li>
                    </ul>
                `,
                summary: 'وقع المعهد بروتوكول تعاون مع أكبر الشركات في الإسكندرية لتدريب الطلاب وتوفير فرص عمل مضمونة للخريجين',
                category: 'شراكة',
                author: 'إدارة المعهد',
                published: true,
                featured: false
            }
        ];

        for (const article of articles) {
            try {
                await window.ContentManager.createArticle(article);
            } catch (error) {
                console.error('Error creating article:', error);
            }
        }
    }

    /**
     * Create sample news
     */
    async createSampleNews() {
        const news = [
            {
                title: 'بدء التسجيل للفصل الدراسي الجديد 2024/2025',
                content: 'يعلن المعهد المصري عن بدء التسجيل للفصل الدراسي الجديد 2024/2025 في جميع التخصصات المتاحة. للتسجيل والاستفسار برجاء التواصل مع شؤون الطلاب.',
                summary: 'بدء التسجيل للفصل الدراسي الجديد 2024/2025',
                published: true,
                urgent: false
            },
            {
                title: 'تأجيل امتحانات الفصل الدراسي الأول',
                content: 'نظراً للظروف الجوية السيئة، تقرر تأجيل امتحانات الفصل الدراسي الأول إلى يوم الأحد القادم. سيتم إبلاغ الطلاب بالمواعيد الجديدة عبر البوابة الإلكترونية.',
                summary: 'تأجيل امتحانات الفصل الدراسي الأول بسبب الظروف الجوية',
                published: true,
                urgent: true
            },
            {
                title: 'ورشة عمل مجانية في Microsoft Excel المتقدم',
                content: 'ينظم المعهد ورشة عمل مجانية في برنامج Microsoft Excel المتقدم لجميع الطلاب والخريجين. الورشة ستكون يوم الخميس القادم من الساعة 10 صباحاً حتى 2 عصراً.',
                summary: 'ورشة عمل مجانية في Microsoft Excel المتقدم للطلاب والخريجين',
                published: true,
                urgent: false
            }
        ];

        for (const newsItem of news) {
            try {
                await window.ContentManager.createNews(newsItem);
            } catch (error) {
                console.error('Error creating news:', error);
            }
        }
    }

    /**
     * Create sample events
     */
    async createSampleEvents() {
        const events = [
            {
                title: 'ورشة ريادة الأعمال للطلاب',
                description: 'ورشة عمل شاملة لتعليم الطلاب كيفية بدء مشروعهم الخاص وتطوير مهارات ريادة الأعمال. ستغطي الورشة جميع جوانب إنشاء وإدارة المشاريع الناشئة.',
                eventDate: new Date('2024-12-20T10:00:00'),
                location: 'قاعة المؤتمرات الكبرى - المعهد المصري',
                capacity: 50,
                registrations: 12,
                registrationOpen: true,
                published: true
            },
            {
                title: 'لقاء الخريجين السنوي 2024',
                description: 'لقاء سنوي يجمع خريجي المعهد من مختلف الدفعات للتواصل وتبادل الخبرات. سيتضمن اللقاء جلسات حوارية مع خريجين ناجحين وورش عمل.',
                eventDate: new Date('2024-12-15T18:00:00'),
                location: 'قاعة الاحتفالات - المعهد المصري',
                capacity: 200,
                registrations: 45,
                registrationOpen: true,
                published: true
            },
            {
                title: 'دورة Excel المتقدمة',
                description: 'دورة تدريبية مكثفة في برنامج Microsoft Excel المتقدم مدتها 3 أيام. ستغطي الدورة جميع الوظائف المتقدمة والماكرو والتحليل الإحصائي.',
                eventDate: new Date('2024-12-25T09:00:00'),
                location: 'معمل الحاسب الآلي - المعهد المصري',
                capacity: 25,
                registrations: 8,
                registrationOpen: true,
                published: true
            }
        ];

        for (const event of events) {
            try {
                await window.ContentManager.createEvent(event);
            } catch (error) {
                console.error('Error creating event:', error);
            }
        }
    }

    /**
     * Create sample students
     */
    async createSampleStudents() {
        const students = [
            {
                studentCode: 'EIA2024001',
                name: 'أحمد محمد علي',
                nationalIdLast5: '12345',
                department: 'إدارة الأعمال',
                year: 'السنة الثالثة',
                email: 'ahmed.mohamed@example.com',
                phone: '01234567890'
            },
            {
                studentCode: 'EIA2024002',
                name: 'فاطمة أحمد محمود',
                nationalIdLast5: '67890',
                department: 'المحاسبة والمراجعة',
                year: 'السنة الثانية',
                email: 'fatma.ahmed@example.com',
                phone: '01098765432'
            },
            {
                studentCode: 'EIA2024003',
                name: 'محمد خالد سعد',
                nationalIdLast5: '54321',
                department: 'نظم معلومات الأعمال',
                year: 'السنة الرابعة',
                email: 'mohamed.khaled@example.com',
                phone: '01567891234'
            }
        ];

        for (const student of students) {
            try {
                await window.FirebaseUtils.addFirestoreData('students', student.studentCode, student);
            } catch (error) {
                console.error('Error creating student:', error);
            }
        }
    }

    /**
     * Create sample results
     */
    async createSampleResults() {
        const results = [
            {
                studentCode: 'EIA2024001',
                studentName: 'أحمد محمد علي',
                nationalIdLast5: '12345',
                department: 'إدارة الأعمال',
                year: 'السنة الثالثة',
                semester: 'الفصل الأول 2024/2025',
                subjects: [
                    { name: 'إدارة التسويق', grade: 85, letterGrade: 'جيد جداً', passed: true },
                    { name: 'المحاسبة الإدارية', grade: 78, letterGrade: 'جيد', passed: true },
                    { name: 'إدارة الموارد البشرية', grade: 92, letterGrade: 'ممتاز', passed: true },
                    { name: 'الإحصاء التطبيقي', grade: 76, letterGrade: 'جيد', passed: true }
                ],
                gpa: 3.2,
                totalGrade: 'جيد جداً'
            },
            {
                studentCode: 'EIA2024002',
                studentName: 'فاطمة أحمد محمود',
                nationalIdLast5: '67890',
                department: 'المحاسبة والمراجعة',
                year: 'السنة الثانية',
                semester: 'الفصل الأول 2024/2025',
                subjects: [
                    { name: 'المحاسبة المالية المتوسطة', grade: 88, letterGrade: 'جيد جداً', passed: true },
                    { name: 'محاسبة التكاليف', grade: 95, letterGrade: 'ممتاز', passed: true },
                    { name: 'الرياضيات المالية', grade: 82, letterGrade: 'جيد جداً', passed: true },
                    { name: 'مبادئ الاقتصاد', grade: 79, letterGrade: 'جيد', passed: true }
                ],
                gpa: 3.6,
                totalGrade: 'جيد جداً'
            }
        ];

        for (const result of results) {
            try {
                await window.ContentManager.addStudentResults(result);
            } catch (error) {
                console.error('Error creating result:', error);
            }
        }
    }

    /**
     * Create sample admin
     */
    async createSampleAdmin() {
        try {
            // This would typically be done through Firebase Admin SDK
            // For demo purposes, we'll create a document that represents admin permissions
            const adminData = {
                name: 'مسؤول النظام',
                email: 'admin@eia.edu.eg',
                role: 'super_admin',
                permissions: ['all'],
                active: true
            };

            console.log('Admin user should be created manually through Firebase Console with email: admin@eia.edu.eg');
            
        } catch (error) {
            console.error('Error creating admin:', error);
        }
    }

    /**
     * Check if data needs initialization
     */
    async checkAndInitialize() {
        try {
            // Check if we have any articles
            const articles = await window.ContentManager.getArticles(1);
            
            if (articles.length === 0) {
                console.log('No articles found, initializing sample data...');
                await this.initializeSampleData();
            } else {
                console.log('Data already exists, skipping initialization');
                this.initialized = true;
            }
            
        } catch (error) {
            console.error('Error checking data:', error);
        }
    }
}

// Initialize sample data when Firebase is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to initialize
    setTimeout(async () => {
        if (window.ContentManager && window.firebaseDb) {
            const dataInitializer = new DataInitializer();
            await dataInitializer.checkAndInitialize();
        }
    }, 3000); // Wait 3 seconds for Firebase to be ready
});

// Make available globally for manual initialization
window.DataInitializer = DataInitializer;