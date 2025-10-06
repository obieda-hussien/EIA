/**
 * Content Management System for Egyptian Institute Alexandria
 * نظام إدارة المحتوى للمعهد المصري لأكاديمية الإسكندرية
 */

class ContentManager {
    constructor() {
        this.collections = {
            articles: 'articles',
            news: 'news', 
            events: 'events',
            notifications: 'notifications',
            students: 'students',
            results: 'results'
        };
    }

    /**
     * Get all articles with pagination
     * @param {number} limit - Number of articles to fetch
     * @param {object} lastDoc - Last document for pagination
     * @returns {Promise<Array>} Articles array
     */
    async getArticles(limit = 10, lastDoc = null) {
        try {
            let query = firebaseDb.collection(this.collections.articles)
                .orderBy('createdAt', 'desc')
                .limit(limit);
            
            if (lastDoc) {
                query = query.startAfter(lastDoc);
            }
            
            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                lastDoc: doc
            }));
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }

    /**
     * Get single article by ID
     * @param {string} id - Article ID
     * @returns {Promise<object>} Article object
     */
    async getArticle(id) {
        try {
            const doc = await firebaseDb.collection(this.collections.articles).doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        } catch (error) {
            console.error('Error fetching article:', error);
            throw error;
        }
    }

    /**
     * Create new article
     * @param {object} articleData - Article data
     * @returns {Promise<string>} Created article ID
     */
    async createArticle(articleData) {
        try {
            const article = {
                title: articleData.title,
                content: articleData.content,
                summary: articleData.summary || '',
                category: articleData.category || 'عام',
                author: articleData.author || 'إدارة المعهد',
                published: articleData.published || false,
                featured: articleData.featured || false,
                imageUrl: articleData.imageUrl || '',
                tags: articleData.tags || [],
                views: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await firebaseDb.collection(this.collections.articles).add(article);
            
            // Send notification if published
            if (article.published) {
                await this.sendNotification({
                    type: 'article',
                    title: 'مقال جديد',
                    message: `تم نشر مقال جديد: ${article.title}`,
                    link: `/article/${docRef.id}`,
                    articleId: docRef.id
                });
            }
            
            return docRef.id;
        } catch (error) {
            console.error('Error creating article:', error);
            throw error;
        }
    }

    /**
     * Update article
     * @param {string} id - Article ID
     * @param {object} articleData - Updated article data
     * @returns {Promise<boolean>} Success status
     */
    async updateArticle(id, articleData) {
        try {
            const updateData = {
                ...articleData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            await firebaseDb.collection(this.collections.articles).doc(id).update(updateData);
            
            // Send notification if newly published
            if (articleData.published && articleData.wasUnpublished) {
                await this.sendNotification({
                    type: 'article',
                    title: 'مقال جديد',
                    message: `تم نشر مقال جديد: ${articleData.title}`,
                    link: `/article/${id}`,
                    articleId: id
                });
            }
            
            return true;
        } catch (error) {
            console.error('Error updating article:', error);
            throw error;
        }
    }

    /**
     * Delete article
     * @param {string} id - Article ID
     * @returns {Promise<boolean>} Success status
     */
    async deleteArticle(id) {
        try {
            await firebaseDb.collection(this.collections.articles).doc(id).delete();
            return true;
        } catch (error) {
            console.error('Error deleting article:', error);
            throw error;
        }
    }

    /**
     * Get all news items
     * @param {number} limit - Number of news items to fetch
     * @returns {Promise<Array>} News array
     */
    async getNews(limit = 10) {
        try {
            const snapshot = await firebaseDb.collection(this.collections.news)
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    }

    /**
     * Create news item
     * @param {object} newsData - News data
     * @returns {Promise<string>} Created news ID
     */
    async createNews(newsData) {
        try {
            const news = {
                title: newsData.title,
                content: newsData.content,
                summary: newsData.summary || '',
                imageUrl: newsData.imageUrl || '',
                published: newsData.published || false,
                urgent: newsData.urgent || false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await firebaseDb.collection(this.collections.news).add(news);
            
            // Send notification if published
            if (news.published) {
                await this.sendNotification({
                    type: 'news',
                    title: news.urgent ? 'خبر عاجل' : 'خبر جديد',
                    message: news.title,
                    link: `/news/${docRef.id}`,
                    newsId: docRef.id,
                    urgent: news.urgent
                });
            }
            
            return docRef.id;
        } catch (error) {
            console.error('Error creating news:', error);
            throw error;
        }
    }

    /**
     * Get all events
     * @param {boolean} upcomingOnly - Get only upcoming events
     * @returns {Promise<Array>} Events array
     */
    async getEvents(upcomingOnly = false) {
        try {
            let query = firebaseDb.collection(this.collections.events);
            
            if (upcomingOnly) {
                const now = new Date();
                query = query.where('eventDate', '>', now);
            }
            
            const snapshot = await query.orderBy('eventDate', 'asc').get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    /**
     * Create event
     * @param {object} eventData - Event data
     * @returns {Promise<string>} Created event ID
     */
    async createEvent(eventData) {
        try {
            const event = {
                title: eventData.title,
                description: eventData.description,
                eventDate: new Date(eventData.eventDate),
                endDate: eventData.endDate ? new Date(eventData.endDate) : null,
                location: eventData.location || 'المعهد المصري',
                capacity: eventData.capacity || 100,
                registrations: 0,
                registrationOpen: eventData.registrationOpen || true,
                published: eventData.published || false,
                imageUrl: eventData.imageUrl || '',
                requirements: eventData.requirements || [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await firebaseDb.collection(this.collections.events).add(event);
            
            // Send notification if published
            if (event.published) {
                await this.sendNotification({
                    type: 'event',
                    title: 'فعالية جديدة',
                    message: `تم إضافة فعالية جديدة: ${event.title}`,
                    link: `/event/${docRef.id}`,
                    eventId: docRef.id
                });
            }
            
            return docRef.id;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    /**
     * Register for event
     * @param {string} eventId - Event ID
     * @param {object} registrationData - Registration data
     * @returns {Promise<boolean>} Success status
     */
    async registerForEvent(eventId, registrationData) {
        try {
            // Check if event exists and has capacity
            const event = await this.getEvent(eventId);
            if (!event) {
                throw new Error('Event not found');
            }
            
            if (event.registrations >= event.capacity) {
                throw new Error('Event is full');
            }
            
            // Add registration
            await firebaseDb.collection('event_registrations').add({
                eventId,
                ...registrationData,
                registeredAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Update event registration count
            await firebaseDb.collection(this.collections.events).doc(eventId).update({
                registrations: firebase.firestore.FieldValue.increment(1)
            });
            
            return true;
        } catch (error) {
            console.error('Error registering for event:', error);
            throw error;
        }
    }

    /**
     * Get event by ID
     * @param {string} id - Event ID
     * @returns {Promise<object>} Event object
     */
    async getEvent(id) {
        try {
            const doc = await firebaseDb.collection(this.collections.events).doc(id).get();
            return doc.exists ? { id: doc.id, ...doc.data() } : null;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error;
        }
    }

    /**
     * Send notification
     * @param {object} notificationData - Notification data
     * @returns {Promise<string>} Notification ID
     */
    async sendNotification(notificationData) {
        try {
            const notification = {
                type: notificationData.type || 'general',
                title: notificationData.title,
                message: notificationData.message,
                link: notificationData.link || '',
                urgent: notificationData.urgent || false,
                read: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                ...notificationData
            };

            // Add to Firestore for persistence
            const docRef = await firebaseDb.collection(this.collections.notifications).add(notification);
            
            // Add to Realtime Database for real-time notifications
            await firebaseRtdb.ref(`notifications/${docRef.id}`).set({
                ...notification,
                id: docRef.id,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            
            return docRef.id;
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }

    /**
     * Get notifications
     * @param {number} limit - Number of notifications to fetch
     * @returns {Promise<Array>} Notifications array
     */
    async getNotifications(limit = 20) {
        try {
            const snapshot = await firebaseDb.collection(this.collections.notifications)
                .orderBy('createdAt', 'desc')
                .limit(limit)
                .get();
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    }

    /**
     * Search student results
     * @param {string} studentCode - Student code
     * @param {string} nationalIdLast5 - Last 5 digits of national ID
     * @returns {Promise<object>} Student results
     */
    async getStudentResults(studentCode, nationalIdLast5) {
        try {
            const snapshot = await firebaseDb.collection(this.collections.results)
                .where('studentCode', '==', studentCode)
                .where('nationalIdLast5', '==', nationalIdLast5)
                .get();
            
            if (snapshot.empty) {
                return null;
            }
            
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error fetching student results:', error);
            throw error;
        }
    }

    /**
     * Add student results
     * @param {object} resultData - Result data
     * @returns {Promise<string>} Result ID
     */
    async addStudentResults(resultData) {
        try {
            const result = {
                studentCode: resultData.studentCode,
                studentName: resultData.studentName,
                nationalIdLast5: resultData.nationalIdLast5,
                department: resultData.department,
                year: resultData.year,
                semester: resultData.semester,
                subjects: resultData.subjects || [],
                gpa: resultData.gpa || 0,
                totalGrade: resultData.totalGrade || '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            const docRef = await firebaseDb.collection(this.collections.results).add(result);
            return docRef.id;
        } catch (error) {
            console.error('Error adding student results:', error);
            throw error;
        }
    }

    /**
     * Listen to real-time notifications
     * @param {function} callback - Callback function
     * @returns {function} Unsubscribe function
     */
    onNotifications(callback) {
        return firebaseRtdb.ref('notifications').on('child_added', callback);
    }

    /**
     * Mark notification as read
     * @param {string} notificationId - Notification ID
     * @returns {Promise<boolean>} Success status
     */
    async markNotificationAsRead(notificationId) {
        try {
            await firebaseDb.collection(this.collections.notifications)
                .doc(notificationId)
                .update({ read: true });
            return true;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    }
}

// Create global instance
window.ContentManager = new ContentManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentManager;
}