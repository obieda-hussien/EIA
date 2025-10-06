/**
 * Firebase Configuration for Egyptian Institute Alexandria
 * الإعدادات الخاصة بفايرباس للمعهد المصري لأكاديمية الإسكندرية
 */

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzOgDmAdmmvR4qM8ok50hzq3_FchDX2XM",
    authDomain: "egyptian-institute.firebaseapp.com",
    databaseURL: "https://egyptian-institute-default-rtdb.firebaseio.com",
    projectId: "egyptian-institute",
    storageBucket: "egyptian-institute.firebasestorage.app",
    messagingSenderId: "718747035496",
    appId: "1:718747035496:web:45c5a2640a7fb7b8d618dd",
    measurementId: "G-KP3QEWSFPE"
};

// Initialize Firebase
let app, auth, db, rtdb;

try {
    // Initialize Firebase app
    app = firebase.initializeApp(firebaseConfig);
    
    // Initialize services
    auth = firebase.auth();
    db = firebase.firestore();
    rtdb = firebase.database();
    
    console.log('Firebase initialized successfully / تم تهيئة فايرباس بنجاح');
    
} catch (error) {
    console.error('Firebase initialization failed / فشل في تهيئة فايرباس:', error);
}

// Set Firestore settings for better performance
if (db) {
    db.settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    });
    
    // Enable offline persistence
    db.enablePersistence().catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code == 'unimplemented') {
            console.log('The current browser does not support persistence.');
        }
    });
}

// Export for use in other files
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseRtdb = rtdb;

// Utility functions for Firebase operations
const FirebaseUtils = {
    
    /**
     * Get current user
     * @returns {object|null} Current user object or null
     */
    getCurrentUser() {
        return auth?.currentUser || null;
    },
    
    /**
     * Check if user is authenticated
     * @returns {boolean} Authentication status
     */
    isAuthenticated() {
        return !!this.getCurrentUser();
    },
    
    /**
     * Sign out current user
     * @returns {Promise} Sign out promise
     */
    async signOut() {
        try {
            await auth.signOut();
            console.log('User signed out successfully / تم تسجيل الخروج بنجاح');
            return true;
        } catch (error) {
            console.error('Sign out error / خطأ في تسجيل الخروج:', error);
            throw error;
        }
    },
    
    /**
     * Get data from Firestore
     * @param {string} collection - Collection name
     * @param {string} doc - Document ID (optional)
     * @returns {Promise} Data promise
     */
    async getFirestoreData(collection, doc = null) {
        try {
            if (doc) {
                const docRef = db.collection(collection).doc(doc);
                const docSnap = await docRef.get();
                return docSnap.exists ? { id: docSnap.id, ...docSnap.data() } : null;
            } else {
                const querySnapshot = await db.collection(collection).get();
                return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
        } catch (error) {
            console.error(`Error getting ${collection} data:`, error);
            throw error;
        }
    },
    
    /**
     * Set data in Firestore
     * @param {string} collection - Collection name
     * @param {string} doc - Document ID
     * @param {object} data - Data to set
     * @returns {Promise} Set data promise
     */
    async setFirestoreData(collection, doc, data) {
        try {
            const docRef = db.collection(collection).doc(doc);
            await docRef.set({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error(`Error setting ${collection} data:`, error);
            throw error;
        }
    },
    
    /**
     * Add data to Firestore
     * @param {string} collection - Collection name
     * @param {object} data - Data to add
     * @returns {Promise} Add data promise
     */
    async addFirestoreData(collection, data) {
        try {
            const docRef = await db.collection(collection).add({
                ...data,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return docRef.id;
        } catch (error) {
            console.error(`Error adding ${collection} data:`, error);
            throw error;
        }
    },
    
    /**
     * Update data in Firestore
     * @param {string} collection - Collection name
     * @param {string} doc - Document ID
     * @param {object} data - Data to update
     * @returns {Promise} Update data promise
     */
    async updateFirestoreData(collection, doc, data) {
        try {
            const docRef = db.collection(collection).doc(doc);
            await docRef.update({
                ...data,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error(`Error updating ${collection} data:`, error);
            throw error;
        }
    },
    
    /**
     * Delete data from Firestore
     * @param {string} collection - Collection name
     * @param {string} doc - Document ID
     * @returns {Promise} Delete data promise
     */
    async deleteFirestoreData(collection, doc) {
        try {
            await db.collection(collection).doc(doc).delete();
            return true;
        } catch (error) {
            console.error(`Error deleting ${collection} data:`, error);
            throw error;
        }
    },
    
    /**
     * Get data from Realtime Database
     * @param {string} path - Database path
     * @returns {Promise} Data promise
     */
    async getRealtimeData(path) {
        try {
            const snapshot = await rtdb.ref(path).once('value');
            return snapshot.val();
        } catch (error) {
            console.error(`Error getting realtime data from ${path}:`, error);
            throw error;
        }
    },
    
    /**
     * Set data in Realtime Database
     * @param {string} path - Database path
     * @param {any} data - Data to set
     * @returns {Promise} Set data promise
     */
    async setRealtimeData(path, data) {
        try {
            await rtdb.ref(path).set({
                ...data,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            return true;
        } catch (error) {
            console.error(`Error setting realtime data to ${path}:`, error);
            throw error;
        }
    },
    
    /**
     * Listen to realtime data changes
     * @param {string} path - Database path
     * @param {function} callback - Callback function
     * @returns {function} Unsubscribe function
     */
    onRealtimeDataChange(path, callback) {
        const ref = rtdb.ref(path);
        ref.on('value', callback);
        return () => ref.off('value', callback);
    }
};

// Make FirebaseUtils globally available
window.FirebaseUtils = FirebaseUtils;

// Authentication state listener
if (auth) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('User is signed in / المستخدم مسجل الدخول:', user.email);
            // Trigger custom event for other parts of the app
            window.dispatchEvent(new CustomEvent('userSignedIn', { detail: user }));
        } else {
            console.log('User is signed out / المستخدم غير مسجل الدخول');
            // Trigger custom event for other parts of the app
            window.dispatchEvent(new CustomEvent('userSignedOut'));
        }
    });
}