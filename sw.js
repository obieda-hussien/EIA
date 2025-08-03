// Service Worker for EIA Institute Website
// Version 1.0

const CACHE_NAME = 'eia-v1.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/js/api.js',
    '/js/animations.js',
    '/js/maps.js',
    '/js/main.js',
    '/favicon.ico',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&family=Tajawal:wght@300;400;500;700;800&display=swap'
];

// تثبيت Service Worker
self.addEventListener('install', function(event) {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.log('Cache addAll failed:', error);
            })
    );
});

// تفعيل Service Worker
self.addEventListener('activate', function(event) {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// التعامل مع الطلبات
self.addEventListener('fetch', function(event) {
    // استراتيجية Cache First للملفات الثابتة
    if (event.request.url.includes('.css') || 
        event.request.url.includes('.js') || 
        event.request.url.includes('.png') || 
        event.request.url.includes('.jpg') || 
        event.request.url.includes('.ico') ||
        event.request.url.includes('fonts.googleapis.com') ||
        event.request.url.includes('cdn.jsdelivr.net')) {
        
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    // إذا وُجد في الكاش، اعرضه
                    if (response) {
                        return response;
                    }
                    
                    // وإلا احضره من الشبكة واحفظه في الكاش
                    return fetch(event.request).then(function(response) {
                        // تحقق من أن الاستجابة صحيحة
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // انسخ الاستجابة
                        var responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
                })
        );
    } 
    // استراتيجية Network First للمحتوى الديناميكي
    else if (event.request.url.includes('/api/') || 
             event.request.method === 'POST') {
        
        event.respondWith(
            fetch(event.request)
                .then(function(response) {
                    // إذا نجح الطلب، احفظه في الكاش
                    if (response.status === 200) {
                        var responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                    }
                    return response;
                })
                .catch(function() {
                    // إذا فشل الطلب، حاول من الكاش
                    return caches.match(event.request);
                })
        );
    }
    // استراتيجية Cache First مع Network Fallback للباقي
    else {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    if (response) {
                        // تحديث في الخلفية
                        fetch(event.request).then(function(fetchResponse) {
                            if (fetchResponse.status === 200) {
                                caches.open(CACHE_NAME).then(function(cache) {
                                    cache.put(event.request, fetchResponse.clone());
                                });
                            }
                        }).catch(function() {
                            // تجاهل أخطاء الشبكة في التحديث الخلفي
                        });
                        
                        return response;
                    }
                    
                    return fetch(event.request);
                })
        );
    }
});

// التعامل مع رسائل من الصفحة الرئيسية
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// تنظيف الكاش القديم
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(function() {
            console.log('Cache cleared');
        });
    }
});

// Push notifications support
self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/android-chrome-192x192.png',
            badge: '/favicon-32x32.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'اذهب إلى الموقع',
                    icon: '/favicon-32x32.png'
                },
                {
                    action: 'close',
                    title: 'إغلاق',
                    icon: '/favicon-32x32.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// التعامل مع النقر على الإشعارات
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Background Sync للنماذج
self.addEventListener('sync', function(event) {
    if (event.tag === 'background-sync-forms') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // معالجة النماذج المحفوظة في IndexedDB
    return new Promise(function(resolve) {
        // هنا يمكن إضافة منطق إرسال النماذج المحفوظة
        console.log('Background sync executed');
        resolve();
    });
}

// تحسين أداء الخطوط
self.addEventListener('fetch', function(event) {
    if (event.request.url.includes('fonts.googleapis.com') || 
        event.request.url.includes('fonts.gstatic.com')) {
        
        event.respondWith(
            caches.open('fonts-cache').then(function(cache) {
                return cache.match(event.request).then(function(response) {
                    if (response) {
                        return response;
                    }
                    
                    return fetch(event.request).then(function(fetchResponse) {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    }
});

// معلومات عن Service Worker
console.log('EIA Service Worker loaded - Version 1.0');
console.log('Caching strategy: Cache First for static assets, Network First for dynamic content');