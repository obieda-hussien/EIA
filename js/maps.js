// Google Maps Integration for EIA Institute
class EIAGoogleMaps {
    constructor() {
        this.instituteLocation = {
            lat: 31.2001,
            lng: 29.9187
        };
        this.map = null;
        this.marker = null;
        this.infoWindow = null;
        this.directionsService = null;
        this.directionsRenderer = null;
    }

    // تهيئة الخريطة
    async initMap() {
        try {
            // تحميل Google Maps API
            await window.eiaApi.loadGoogleMaps();
            
            // إنشاء الخريطة
            this.map = new google.maps.Map(document.getElementById('google-map'), {
                zoom: 16,
                center: this.instituteLocation,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: this.getCustomMapStyles(),
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: true,
                rotateControl: false,
                fullscreenControl: true
            });

            // إضافة الـ marker
            this.addInstituteMarker();
            
            // إضافة النافذة المعلوماتية
            this.createInfoWindow();
            
            // إضافة خدمات الاتجاهات
            this.initDirectionsService();
            
            // إضافة الأزرار المخصصة
            this.addCustomControls();
            
            // إضافة الأماكن المجاورة
            this.addNearbyPlaces();

            console.log('Google Maps initialized successfully');
            
        } catch (error) {
            console.error('Error initializing Google Maps:', error);
            this.showMapError();
        }
    }

    // إضافة marker للمعهد
    addInstituteMarker() {
        // إنشاء أيقونة مخصصة للمعهد
        const instituteIcon = {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#1e40af" stroke="#ffffff" stroke-width="2"/>
                    <path d="M12 16h16v2h-2v8h2v2H12v-2h2v-8h-2v-2zm4 2v8h2v-8h-2zm4 0v8h2v-8h-2zm4 0v8h2v-8h-2z" fill="#ffffff"/>
                    <path d="M11 14h18l-9-6-9 6z" fill="#ffffff"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40)
        };

        this.marker = new google.maps.Marker({
            position: this.instituteLocation,
            map: this.map,
            icon: instituteIcon,
            title: 'المعهد المصري لأكاديمية الإسكندرية',
            animation: google.maps.Animation.DROP
        });

        // إضافة حدث النقر على الـ marker
        this.marker.addListener('click', () => {
            this.infoWindow.open(this.map, this.marker);
            this.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                this.marker.setAnimation(null);
            }, 2000);
        });
    }

    // إنشاء النافذة المعلوماتية
    createInfoWindow() {
        const contentString = `
            <div style="max-width: 300px; font-family: 'Cairo', sans-serif; direction: rtl;">
                <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 15px; margin: -10px -10px 10px -10px; border-radius: 8px 8px 0 0;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold;">🎓 المعهد المصري</h3>
                    <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">أكاديمية الإسكندرية للإدارة والمحاسبة</p>
                </div>
                
                <div style="padding: 0 5px;">
                    <div style="margin: 10px 0; display: flex; align-items: center;">
                        <span style="color: #1e40af; margin-left: 8px;">📍</span>
                        <strong>العنوان:</strong> 3 شارع الملك - أمام محطة قطار المنتزة
                    </div>
                    
                    <div style="margin: 10px 0; display: flex; align-items: center;">
                        <span style="color: #059669; margin-left: 8px;">📞</span>
                        <strong>الهاتف:</strong> 
                        <a href="tel:16000" style="color: #059669; text-decoration: none; margin-right: 5px;">16000</a>
                    </div>
                    
                    <div style="margin: 10px 0; display: flex; align-items: center;">
                        <span style="color: #dc2626; margin-left: 8px;">⏰</span>
                        <strong>المواعيد:</strong> 9 ص - 3 م (الأحد-الخميس)
                    </div>
                    
                    <div style="margin: 15px 0; text-align: center;">
                        <button onclick="window.eiaGoogleMaps.getDirections()" 
                                style="background: #1e40af; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; margin: 0 5px; font-family: 'Cairo', sans-serif;">
                            🧭 اتجاهات القيادة
                        </button>
                        <button onclick="window.eiaGoogleMaps.showStreetView()" 
                                style="background: #059669; color: white; border: none; padding: 8px 16px; border-radius: 20px; cursor: pointer; margin: 0 5px; font-family: 'Cairo', sans-serif;">
                            👁️ رؤية الشارع
                        </button>
                    </div>
                    
                    <div style="margin: 10px 0; padding: 10px; background: #f0f7ff; border-radius: 8px; text-align: center;">
                        <small style="color: #1e40af;">
                            <strong>28 سنة من التميز في التعليم</strong><br>
                            أكثر من 4000 طالب وطالبة
                        </small>
                    </div>
                </div>
            </div>
        `;

        this.infoWindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 320
        });
    }

    // تهيئة خدمة الاتجاهات
    initDirectionsService() {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            draggable: true,
            panel: null
        });
        this.directionsRenderer.setMap(this.map);
    }

    // الحصول على الاتجاهات
    getDirections() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const origin = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.calculateAndDisplayRoute(origin);
                },
                () => {
                    // إذا فشل تحديد الموقع، اطلب من المستخدم إدخال العنوان
                    this.promptForAddress();
                }
            );
        } else {
            this.promptForAddress();
        }
    }

    promptForAddress() {
        const address = prompt('أدخل عنوانك أو منطقتك:');
        if (address) {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: address + ', Alexandria, Egypt' }, (results, status) => {
                if (status === 'OK') {
                    this.calculateAndDisplayRoute(results[0].geometry.location);
                } else {
                    alert('لم يتم العثور على العنوان. تأكد من كتابته بشكل صحيح.');
                }
            });
        }
    }

    calculateAndDisplayRoute(origin) {
        this.directionsService.route({
            origin: origin,
            destination: this.instituteLocation,
            travelMode: google.maps.TravelMode.DRIVING,
            language: 'ar'
        }, (response, status) => {
            if (status === 'OK') {
                this.directionsRenderer.setDirections(response);
                this.showRouteInfo(response);
            } else {
                alert('فشل في حساب المسار: ' + status);
            }
        });
    }

    showRouteInfo(response) {
        const route = response.routes[0];
        const leg = route.legs[0];
        
        const routeInfo = `
            🚗 المسافة: ${leg.distance.text}
            ⏱️ الوقت المتوقع: ${leg.duration.text}
            📍 من: ${leg.start_address}
            🎯 إلى: ${leg.end_address}
        `;
        
        console.log('Route Info:', routeInfo);
        
        // إضافة معلومات المسار في نافذة منبثقة
        const routeWindow = new google.maps.InfoWindow({
            content: `
                <div style="font-family: 'Cairo', sans-serif; direction: rtl; max-width: 250px;">
                    <h4 style="color: #1e40af; margin: 0 0 10px 0;">معلومات المسار</h4>
                    <div style="line-height: 1.6;">
                        ${routeInfo.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `,
            position: this.instituteLocation
        });
        
        routeWindow.open(this.map);
    }

    // عرض شارع
    showStreetView() {
        const panorama = new google.maps.StreetViewPanorama(
            document.getElementById('street-view-container') || document.createElement('div'),
            {
                position: this.instituteLocation,
                pov: { heading: 34, pitch: 10 },
                visible: true,
                addressControl: false,
                linksControl: true,
                panControl: true,
                enableCloseButton: true
            }
        );

        // إنشاء نافذة منبثقة لعرض الشارع
        const streetViewModal = document.createElement('div');
        streetViewModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const streetViewContainer = document.createElement('div');
        streetViewContainer.id = 'street-view-container';
        streetViewContainer.style.cssText = `
            width: 90%;
            height: 80%;
            max-width: 1000px;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
        `;

        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            z-index: 10001;
            font-size: 18px;
        `;

        closeButton.onclick = () => {
            document.body.removeChild(streetViewModal);
        };

        streetViewContainer.appendChild(closeButton);
        streetViewModal.appendChild(streetViewContainer);
        document.body.appendChild(streetViewModal);

        // تهيئة Street View
        panorama.setVisible(true);
        streetViewContainer.appendChild(panorama.getDiv());
    }

    // إضافة الأماكن المجاورة
    addNearbyPlaces() {
        const nearbyPlaces = [
            {
                position: { lat: 31.2010, lng: 29.9190 },
                title: 'محطة قطار المنتزة',
                icon: '🚂',
                type: 'transport'
            },
            {
                position: { lat: 31.1995, lng: 29.9180 },
                title: 'مستشفى المنتزة',
                icon: '🏥',
                type: 'hospital'
            },
            {
                position: { lat: 31.2005, lng: 29.9200 },
                title: 'مول المنتزة',
                icon: '🛍️',
                type: 'shopping'
            },
            {
                position: { lat: 31.1990, lng: 29.9175 },
                title: 'مسجد المنتزة',
                icon: '🕌',
                type: 'religious'
            }
        ];

        nearbyPlaces.forEach(place => {
            const marker = new google.maps.Marker({
                position: place.position,
                map: this.map,
                title: place.title,
                icon: {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                            <circle cx="15" cy="15" r="12" fill="#ffffff" stroke="#666666" stroke-width="2"/>
                            <text x="15" y="20" text-anchor="middle" font-size="14">${place.icon}</text>
                        </svg>
                    `)}`,
                    scaledSize: new google.maps.Size(30, 30),
                    anchor: new google.maps.Point(15, 30)
                }
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="font-family: 'Cairo', sans-serif; direction: rtl; text-align: center;">
                        <h4 style="margin: 0; color: #1e40af;">${place.icon} ${place.title}</h4>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(this.map, marker);
            });
        });
    }

    // إضافة أزرار مخصصة للخريطة
    addCustomControls() {
        // زر تحديد الموقع الحالي
        const locationButton = document.createElement('button');
        locationButton.innerHTML = '📍';
        locationButton.style.cssText = `
            background: white;
            border: 2px solid #1e40af;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            margin: 10px;
            font-size: 16px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        `;
        locationButton.title = 'تحديد موقعي الحالي';

        locationButton.addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        this.map.setCenter(pos);
                        this.map.setZoom(15);
                        
                        // إضافة marker للموقع الحالي
                        new google.maps.Marker({
                            position: pos,
                            map: this.map,
                            title: 'موقعك الحالي',
                            icon: {
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                        <circle cx="10" cy="10" r="8" fill="#4285f4" stroke="#ffffff" stroke-width="2"/>
                                        <circle cx="10" cy="10" r="3" fill="#ffffff"/>
                                    </svg>
                                `),
                                scaledSize: new google.maps.Size(20, 20),
                                anchor: new google.maps.Point(10, 10)
                            }
                        });
                    },
                    () => {
                        alert('فشل في تحديد موقعك الحالي');
                    }
                );
            } else {
                alert('متصفحك لا يدعم تحديد الموقع');
            }
        });

        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

        // زر العودة للمعهد
        const homeButton = document.createElement('button');
        homeButton.innerHTML = '🎓';
        homeButton.style.cssText = locationButton.style.cssText;
        homeButton.title = 'العودة للمعهد';

        homeButton.addEventListener('click', () => {
            this.map.setCenter(this.instituteLocation);
            this.map.setZoom(16);
            this.infoWindow.open(this.map, this.marker);
        });

        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(homeButton);
    }

    // أنماط مخصصة للخريطة
    getCustomMapStyles() {
        return [
            {
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ saturation: -10 }, { lightness: 5 }]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{ color: '#3b82f6' }, { lightness: 20 }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1e40af' }, { weight: 0.5 }]
            },
            {
                featureType: 'poi.school',
                elementType: 'geometry.fill',
                stylers: [{ color: '#10b981' }]
            },
            {
                featureType: 'poi.medical',
                elementType: 'geometry.fill',
                stylers: [{ color: '#ef4444' }]
            }
        ];
    }

    // عرض خطأ في حالة فشل تحميل الخريطة
    showMapError() {
        const mapContainer = document.getElementById('google-map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 20px; padding: 20px; text-align: center; font-family: 'Cairo', sans-serif;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🗺️</div>
                    <h3 style="color: #374151; margin-bottom: 10px;">عذراً، لا يمكن تحميل الخريطة</h3>
                    <p style="color: #6b7280; margin-bottom: 20px;">يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى</p>
                    <div style="background: #e5e7eb; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="margin: 0; color: #374151;">
                            <strong>📍 عنوان المعهد:</strong><br>
                            3 شارع الملك - أمام محطة قطار المنتزة<br>
                            شرق الإسكندرية، مصر
                        </p>
                    </div>
                    <button onclick="window.eiaGoogleMaps.initMap()" 
                            style="background: #1e40af; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-family: 'Cairo', sans-serif;">
                        🔄 إعادة المحاولة
                    </button>
                </div>
            `;
        }
    }

    // تحديث حجم الخريطة عند تغيير حجم النافذة
    resize() {
        if (this.map) {
            google.maps.event.trigger(this.map, 'resize');
            this.map.setCenter(this.instituteLocation);
        }
    }
}

// دالة تهيئة الخريطة العامة (مطلوبة لـ Google Maps API)
function initMap() {
    if (window.eiaGoogleMaps) {
        window.eiaGoogleMaps.initMap();
    }
}

// إنشاء instance عامة
window.eiaGoogleMaps = new EIAGoogleMaps();

// تهيئة الخريطة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // إضافة عنصر الخريطة إذا لم يكن موجوداً
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer && !document.getElementById('google-map')) {
        mapContainer.innerHTML = `
            <div id="google-map" style="width: 100%; height: 400px; border-radius: 20px;">
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 20px;">
                    <div style="text-align: center; font-family: 'Cairo', sans-serif;">
                        <div style="font-size: 32px; margin-bottom: 10px;">🗺️</div>
                        <p style="color: #6b7280;">جاري تحميل الخريطة...</p>
                    </div>
                </div>
            </div>
        `;
    }

    // تهيئة الخريطة بعد تأخير قصير للتأكد من تحميل العناصر
    setTimeout(() => {
        window.eiaGoogleMaps.initMap();
    }, 1000);
});

// التعامل مع تغيير حجم النافذة
window.addEventListener('resize', () => {
    if (window.eiaGoogleMaps) {
        window.eiaGoogleMaps.resize();
    }
});