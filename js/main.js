/**
 * Main JavaScript functionality for Egyptian Institute Alexandria website
 * Extended functionality and map integration
 */

/**
 * Enhanced section navigation with map refresh
 * @param {string} sectionId - Target section ID
 */
function showSectionWithMapRefresh(sectionId) {
    // Call the original showSection function
    showSection(sectionId);
    
    // Refresh maps after section change
    setTimeout(() => {
        if (sectionId === 'home' && maps.homeMap) {
            refreshMap('homeMap');
        } else if (sectionId === 'contact' && maps.contactMap) {
            refreshMap('contactMap');
        }
    }, 300);
}

/**
 * Enhanced map container click handlers
 */
function setupMapInteractions() {
    // Add click handlers for map containers
    const homeMapContainer = document.getElementById('map-container-home');
    const contactMapContainer = document.getElementById('map-container-contact');
    
    if (homeMapContainer) {
        homeMapContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('directions-btn')) {
                getDirections();
            } else if (e.target.classList.contains('street-view-btn')) {
                openStreetView();
            }
        });
    }
    
    if (contactMapContainer) {
        contactMapContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('directions-btn')) {
                getDirections();
            } else if (e.target.classList.contains('street-view-btn')) {
                openStreetView();
            }
        });
    }
}

/**
 * Enhanced button handler setup for better compatibility
 */
function setupEnhancedButtonHandlers() {
    // Find and update direction buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('احصل على الاتجاهات') || buttonText.includes('الاتجاهات')) {
            button.onclick = getDirections;
            button.classList.add('directions-btn');
        }
        
        if (buttonText.includes('عرض الشارع')) {
            button.onclick = openStreetView;
            button.classList.add('street-view-btn');
        }
    });
}

/**
 * Add custom styles for map markers and popups
 */
function addMapStyles() {
    if (document.getElementById('map-custom-styles')) {
        return; // Styles already added
    }
    
    const styles = document.createElement('style');
    styles.id = 'map-custom-styles';
    styles.textContent = `
        /* Simple Map Styles */
        .simple-map {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 50%, #81d4fa 100%);
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .map-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        }
        
        /* Institute Marker */
        .institute-marker {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
            z-index: 10;
        }
        
        .marker-pin {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 16px rgba(30, 64, 175, 0.4);
            animation: bounce 2s ease-in-out infinite alternate;
            position: relative;
        }
        
        .marker-pin::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 80%;
            height: 80%;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50% 50% 50% 0;
            transform: translate(-50%, -50%);
        }
        
        .marker-pin i {
            color: white;
            font-size: 24px;
            transform: rotate(45deg);
            z-index: 1;
        }
        
        .marker-label {
            position: absolute;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(30, 64, 175, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes bounce {
            0% { transform: rotate(-45deg) translateY(0px); }
            100% { transform: rotate(-45deg) translateY(-8px); }
        }
        
        /* Map Info Panel */
        .map-info {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            transform: translateY(100%);
            opacity: 0;
            transition: all 0.4s ease;
            z-index: 20;
            direction: rtl;
            text-align: right;
        }
        
        .map-info.visible {
            transform: translateY(0);
            opacity: 1;
        }
        
        .info-content h3 {
            color: #1e40af;
            margin: 0 0 10px 0;
            font-size: 18px;
            font-weight: bold;
        }
        
        .info-content p {
            margin: 8px 0;
            color: #666;
            font-size: 14px;
        }
        
        .info-content p i {
            color: #1e40af;
            margin-left: 8px;
        }
        
        .map-actions {
            display: flex;
            gap: 8px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        
        .map-btn {
            background: #1e40af;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            flex: 1;
            min-width: 120px;
        }
        
        .map-btn:hover {
            background: #1e3a8a;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(30, 64, 175, 0.3);
        }
        
        .map-btn.street-view-btn {
            background: #059669;
        }
        
        .map-btn.street-view-btn:hover {
            background: #047857;
        }
        
        .map-btn.open-maps-btn {
            background: #7c3aed;
        }
        
        .map-btn.open-maps-btn:hover {
            background: #6d28d9;
        }
        
        .map-btn i {
            margin-left: 5px;
        }
        
        /* Map Controls */
        .map-controls {
            position: absolute;
            top: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            z-index: 15;
        }
        
        .zoom-btn {
            width: 40px;
            height: 40px;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .zoom-btn:hover {
            background: #f3f4f6;
            border-color: #1e40af;
            color: #1e40af;
            transform: scale(1.1);
        }
        
        .zoom-btn i {
            font-size: 14px;
        }
        
        /* Map Attribution */
        .map-attribution {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 10px;
            z-index: 5;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            .marker-pin {
                width: 50px;
                height: 50px;
            }
            
            .marker-pin i {
                font-size: 20px;
            }
            
            .marker-label {
                font-size: 12px;
                padding: 6px 10px;
                top: 60px;
            }
            
            .map-info {
                bottom: 10px;
                left: 10px;
                right: 10px;
                padding: 15px;
            }
            
            .info-content h3 {
                font-size: 16px;
            }
            
            .map-actions {
                flex-direction: column;
            }
            
            .map-btn {
                min-width: auto;
                font-size: 11px;
                padding: 8px 12px;
            }
            
            .map-controls {
                top: 10px;
                right: 10px;
            }
            
            .zoom-btn {
                width: 35px;
                height: 35px;
            }
            
            .zoom-btn i {
                font-size: 12px;
            }
        }
        
        /* Map container improvements */
        .map-container {
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            position: relative;
            background: linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%);
        }
        
        /* Loading animation for maps */
        .map-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            background: linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%);
        }
        
        .map-loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e5e7eb;
            border-top: 4px solid #1e40af;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Map interaction effects */
        .simple-map:hover .marker-pin {
            animation-duration: 1s;
        }
        
        .simple-map:hover .marker-label {
            background: rgba(30, 64, 175, 1);
            transform: translateX(-50%) scale(1.05);
        }
    `;
    
    document.head.appendChild(styles);
}

/**
 * Show loading state for maps
 * @param {string} containerId - Map container ID
 */
function showMapLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="map-loading">
                <div class="text-center">
                    <div class="map-loading-spinner mx-auto mb-3"></div>
                    <p class="text-blue-800 font-semibold">جاري تحميل الخريطة...</p>
                </div>
            </div>
        `;
    }
}

/**
 * Enhanced initialization function
 */
function initializeEnhancedMaps() {
    // Add custom styles
    addMapStyles();
    
    // Setup interactions
    setupMapInteractions();
    
    // Update button handlers
    setupEnhancedButtonHandlers();
}

/**
 * Initialize enhanced functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedMaps();
    
    // Override the original showSection function to include map refresh
    const originalShowSection = window.showSection;
    if (originalShowSection) {
        window.showSection = function(sectionId) {
            originalShowSection(sectionId);
            
            // Refresh maps after section change
            setTimeout(() => {
                if (sectionId === 'home' && window.maps && window.maps.homeMap) {
                    window.refreshMap('homeMap');
                } else if (sectionId === 'contact' && window.maps && window.maps.contactMap) {
                    window.refreshMap('contactMap');
                }
            }, 300);
        };
    }
});

/**
 * Utility function to check if element contains text (for older browsers)
 */
function elementContainsText(element, text) {
    return element.textContent.indexOf(text) !== -1;
}

/**
 * Enhanced button handler setup for better compatibility
 */
function setupEnhancedButtonHandlers() {
    // Find and update direction buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('احصل على الاتجاهات') || buttonText.includes('الاتجاهات')) {
            button.onclick = getDirections;
            button.classList.add('directions-btn');
        }
        
        if (buttonText.includes('عرض الشارع')) {
            button.onclick = openStreetView;
            button.classList.add('street-view-btn');
        }
    });
}

/**
 * Setup enhanced button handlers after a delay to ensure DOM is fully ready
 */
setTimeout(setupEnhancedButtonHandlers, 1000);