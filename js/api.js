/**
 * API and Map functionality for Egyptian Institute Alexandria website
 * Interactive maps without external API requirements using custom implementation
 */

// Institute location coordinates
const INSTITUTE_COORDINATES = {
    lat: 31.2001,
    lng: 29.9187,
    address: "3 شارع الملك - أمام محطة قطار المنتزة - شرق الإسكندرية",
    name: "المعهد المصري لأكاديمية الإسكندرية للإدارة والمحاسبة"
};

// Map instances storage
let maps = {};

/**
 * Initialize all maps on the page
 */
function initializeMaps() {
    // Initialize home section map
    initializeSimpleMap('homeMap', 'map-container-home');
    
    // Initialize contact section map
    initializeSimpleMap('contactMap', 'map-container-contact');
}

/**
 * Initialize a simple interactive map without external dependencies
 * @param {string} mapId - Unique identifier for the map
 * @param {string} containerId - DOM element ID for the map container
 */
function initializeSimpleMap(mapId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Map container ${containerId} not found`);
        return;
    }

    // Create map HTML structure
    const mapHTML = `
        <div class="simple-map" id="${mapId}">
            <div class="map-overlay">
                <div class="institute-marker" onclick="showInstituteInfo('${mapId}')">
                    <div class="marker-pin">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="marker-label">المعهد المصري</div>
                </div>
                
                <div class="map-info" id="${mapId}-info">
                    <div class="info-content">
                        <h3>${INSTITUTE_COORDINATES.name}</h3>
                        <p><i class="fas fa-map-marker-alt"></i> ${INSTITUTE_COORDINATES.address}</p>
                        <div class="map-actions">
                            <button onclick="getDirections()" class="map-btn directions-btn">
                                <i class="fas fa-directions"></i>
                                احصل على الاتجاهات
                            </button>
                            <button onclick="openStreetView()" class="map-btn street-view-btn">
                                <i class="fas fa-street-view"></i>
                                عرض الشارع
                            </button>
                            <button onclick="openInMaps()" class="map-btn open-maps-btn">
                                <i class="fas fa-external-link-alt"></i>
                                فتح في الخرائط
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="map-controls">
                    <button onclick="zoomIn('${mapId}')" class="zoom-btn zoom-in">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button onclick="zoomOut('${mapId}')" class="zoom-btn zoom-out">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button onclick="centerMap('${mapId}')" class="zoom-btn center-map">
                        <i class="fas fa-crosshairs"></i>
                    </button>
                </div>
                
                <div class="map-attribution">
                    خريطة تفاعلية - ${INSTITUTE_COORDINATES.name}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = mapHTML;
    
    // Store map instance reference
    maps[mapId] = {
        container: container,
        zoom: 1,
        maxZoom: 3,
        minZoom: 0.5
    };

    // Auto-show info for better UX
    setTimeout(() => {
        showInstituteInfo(mapId);
    }, 500);
}

/**
 * Show institute information
 * @param {string} mapId - Map instance ID
 */
function showInstituteInfo(mapId) {
    const info = document.getElementById(`${mapId}-info`);
    if (info) {
        info.classList.add('visible');
        
        // Hide after 5 seconds
        setTimeout(() => {
            info.classList.remove('visible');
        }, 5000);
    }
}

/**
 * Zoom in on the map
 * @param {string} mapId - Map instance ID
 */
function zoomIn(mapId) {
    const mapInstance = maps[mapId];
    if (mapInstance && mapInstance.zoom < mapInstance.maxZoom) {
        mapInstance.zoom += 0.2;
        const mapElement = document.getElementById(mapId);
        if (mapElement) {
            mapElement.style.transform = `scale(${mapInstance.zoom})`;
            mapElement.style.transformOrigin = 'center';
        }
    }
}

/**
 * Zoom out on the map
 * @param {string} mapId - Map instance ID
 */
function zoomOut(mapId) {
    const mapInstance = maps[mapId];
    if (mapInstance && mapInstance.zoom > mapInstance.minZoom) {
        mapInstance.zoom -= 0.2;
        const mapElement = document.getElementById(mapId);
        if (mapElement) {
            mapElement.style.transform = `scale(${mapInstance.zoom})`;
            mapElement.style.transformOrigin = 'center';
        }
    }
}

/**
 * Center the map
 * @param {string} mapId - Map instance ID
 */
function centerMap(mapId) {
    const mapInstance = maps[mapId];
    if (mapInstance) {
        mapInstance.zoom = 1;
        const mapElement = document.getElementById(mapId);
        if (mapElement) {
            mapElement.style.transform = 'scale(1)';
            mapElement.style.transformOrigin = 'center';
        }
        showInstituteInfo(mapId);
    }
}

/**
 * Get directions to the institute
 */
function getDirections() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Open Google Maps with directions
                const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`;
                window.open(url, '_blank');
            },
            function(error) {
                // Fallback: open Google Maps without user location
                const url = `https://www.google.com/maps/dir//${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`;
                window.open(url, '_blank');
            }
        );
    } else {
        // Browser doesn't support geolocation
        const url = `https://www.google.com/maps/dir//${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`;
        window.open(url, '_blank');
    }
}

/**
 * Open street view of the institute
 */
function openStreetView() {
    const url = `https://www.google.com/maps/@${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i13312!8i6656`;
    window.open(url, '_blank');
}

/**
 * Open institute location in external maps
 */
function openInMaps() {
    const url = `https://www.google.com/maps/place/${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`;
    window.open(url, '_blank');
}

/**
 * Refresh map when switching sections
 * @param {string} mapId - Map instance ID
 */
function refreshMap(mapId) {
    if (maps[mapId]) {
        centerMap(mapId);
    }
}

/**
 * Initialize maps when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize maps immediately since we don't depend on external libraries
    setTimeout(initializeMaps, 100);
});