/**
 * Interactive Map Component for EIA Institute
 * Real interactive map without external APIs
 */

class InteractiveMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.mapData = this.getInstituteLocationData();
        this.init();
    }

    getInstituteLocationData() {
        return {
            instituteName: 'المعهد المصري لأكاديمية الإسكندرية',
            address: '3 شارع الملك - أمام محطة قطار المنتزة - شرق الإسكندرية',
            coordinates: { lat: 31.2001, lng: 29.9187 },
            landmarks: [
                { name: 'محطة قطار المنتزة', type: 'transport', x: 45, y: 50 },
                { name: 'المعهد المصري', type: 'institute', x: 55, y: 45 },
                { name: 'مول سان ستيفانو', type: 'shopping', x: 60, y: 40 },
                { name: 'حديقة المنتزة', type: 'park', x: 70, y: 35 },
                { name: 'مسجد المنتزة', type: 'mosque', x: 40, y: 55 },
                { name: 'مستشفى المنتزة', type: 'hospital', x: 35, y: 48 },
                { name: 'بنك مصر', type: 'bank', x: 50, y: 52 },
                { name: 'صيدلية النهار', type: 'pharmacy', x: 58, y: 48 }
            ],
            transportRoutes: [
                { name: 'أتوبيس 445', stops: ['المنتزة', 'سيدي جابر', 'محطة مصر'] },
                { name: 'أتوبيس 750', stops: ['المنتزة', 'الإبراهيمية', 'بولكلي'] },
                { name: 'ميكروباص', stops: ['المنتزة', 'سموحة', 'محطة مصر'] }
            ]
        };
    }

    init() {
        this.createMapContainer();
        this.createMapSVG();
        this.addLandmarks();
        this.addControls();
        this.addInfoPanel();
        this.bindEvents();
    }

    createMapContainer() {
        this.container.innerHTML = '';
        this.container.className = 'interactive-map-container';
        
        // Add map styles
        const style = document.createElement('style');
        style.textContent = `
            .interactive-map-container {
                position: relative;
                width: 100%;
                height: 400px;
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                cursor: grab;
            }
            
            .interactive-map-container:active {
                cursor: grabbing;
            }
            
            .map-svg {
                width: 100%;
                height: 100%;
                transition: transform 0.3s ease;
            }
            
            .landmark {
                cursor: pointer;
                transition: all 0.3s ease;
                transform-origin: center;
            }
            
            .landmark:hover {
                transform: scale(1.2);
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
            }
            
            .landmark.institute {
                animation: pulse-institute 2s infinite;
            }
            
            @keyframes pulse-institute {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .landmark-tooltip {
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -100%);
                margin-top: -10px;
                opacity: 0;
                transition: opacity 0.3s ease;
                white-space: nowrap;
            }
            
            .landmark-tooltip.show {
                opacity: 1;
            }
            
            .landmark-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border: 5px solid transparent;
                border-top-color: rgba(0, 0, 0, 0.8);
            }
            
            .map-controls {
                position: absolute;
                top: 15px;
                right: 15px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 100;
            }
            
            .map-control-btn {
                width: 40px;
                height: 40px;
                background: white;
                border: none;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #3b82f6;
            }
            
            .map-control-btn:hover {
                background: #3b82f6;
                color: white;
                transform: scale(1.1);
            }
            
            .map-info-panel {
                position: absolute;
                bottom: 15px;
                left: 15px;
                background: white;
                padding: 15px;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                max-width: 300px;
                z-index: 100;
                transform: translateY(100%);
                transition: transform 0.3s ease;
            }
            
            .map-info-panel.show {
                transform: translateY(0);
            }
            
            .info-title {
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .info-content {
                color: #6b7280;
                font-size: 12px;
                line-height: 1.4;
            }
            
            .transport-routes {
                margin-top: 10px;
                padding-top: 10px;
                border-top: 1px solid #e5e7eb;
            }
            
            .route-item {
                display: flex;
                align-items: center;
                margin-bottom: 5px;
                font-size: 11px;
            }
            
            .route-icon {
                width: 20px;
                height: 20px;
                background: #3b82f6;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 10px;
                margin-left: 8px;
            }
            
            .street-grid {
                stroke: #90caf9;
                stroke-width: 1;
                opacity: 0.6;
            }
            
            .main-road {
                stroke: #1976d2;
                stroke-width: 3;
                opacity: 0.8;
            }
            
            .building {
                fill: #455a64;
                opacity: 0.7;
                transition: all 0.3s ease;
            }
            
            .building:hover {
                fill: #3b82f6;
                opacity: 1;
            }
            
            .green-area {
                fill: #4caf50;
                opacity: 0.6;
            }
            
            .water-area {
                fill: #2196f3;
                opacity: 0.4;
            }
            
            @media (max-width: 768px) {
                .interactive-map-container {
                    height: 300px;
                }
                
                .map-info-panel {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                    bottom: 10px;
                }
                
                .map-controls {
                    top: 10px;
                    right: 10px;
                }
            }
        `;
        
        if (!document.getElementById('map-styles')) {
            style.id = 'map-styles';
            document.head.appendChild(style);
        }
    }

    createMapSVG() {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('class', 'map-svg');
        this.svg.setAttribute('viewBox', '0 0 100 100');
        
        // Add street grid
        this.addStreetGrid();
        
        // Add geographical features
        this.addGeographicalFeatures();
        
        this.container.appendChild(this.svg);
    }

    addStreetGrid() {
        // Main roads
        const mainRoads = [
            { x1: 0, y1: 45, x2: 100, y2: 45 }, // شارع الملك
            { x1: 55, y1: 0, x2: 55, y2: 100 }, // طريق المنتزة
        ];

        mainRoads.forEach(road => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', road.x1);
            line.setAttribute('y1', road.y1);
            line.setAttribute('x2', road.x2);
            line.setAttribute('y2', road.y2);
            line.setAttribute('class', 'main-road');
            this.svg.appendChild(line);
        });

        // Street grid
        for (let i = 10; i <= 90; i += 20) {
            // Vertical lines
            const vLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            vLine.setAttribute('x1', i);
            vLine.setAttribute('y1', 0);
            vLine.setAttribute('x2', i);
            vLine.setAttribute('y2', 100);
            vLine.setAttribute('class', 'street-grid');
            this.svg.appendChild(vLine);

            // Horizontal lines
            const hLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            hLine.setAttribute('x1', 0);
            hLine.setAttribute('y1', i);
            hLine.setAttribute('x2', 100);
            hLine.setAttribute('y2', i);
            hLine.setAttribute('class', 'street-grid');
            this.svg.appendChild(hLine);
        }
    }

    addGeographicalFeatures() {
        // Green areas (parks)
        const park = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        park.setAttribute('cx', 70);
        park.setAttribute('cy', 35);
        park.setAttribute('rx', 15);
        park.setAttribute('ry', 10);
        park.setAttribute('class', 'green-area');
        this.svg.appendChild(park);

        // Water area (sea)
        const water = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        water.setAttribute('x', 0);
        water.setAttribute('y', 0);
        water.setAttribute('width', 100);
        water.setAttribute('height', 15);
        water.setAttribute('class', 'water-area');
        this.svg.appendChild(water);

        // Buildings
        const buildings = [
            { x: 20, y: 40, width: 8, height: 12 },
            { x: 30, y: 35, width: 6, height: 15 },
            { x: 75, y: 50, width: 10, height: 10 },
            { x: 85, y: 45, width: 8, height: 18 },
        ];

        buildings.forEach(building => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', building.x);
            rect.setAttribute('y', building.y);
            rect.setAttribute('width', building.width);
            rect.setAttribute('height', building.height);
            rect.setAttribute('class', 'building');
            this.svg.appendChild(rect);
        });
    }

    addLandmarks() {
        this.mapData.landmarks.forEach(landmark => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.setAttribute('class', `landmark ${landmark.type}`);
            group.setAttribute('transform', `translate(${landmark.x}, ${landmark.y})`);

            // Landmark icon
            const icon = this.createLandmarkIcon(landmark.type);
            group.appendChild(icon);

            // Tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'landmark-tooltip';
            tooltip.textContent = landmark.name;
            this.container.appendChild(tooltip);

            // Events
            group.addEventListener('mouseenter', (e) => {
                tooltip.classList.add('show');
                const rect = this.container.getBoundingClientRect();
                tooltip.style.left = (landmark.x / 100 * rect.width) + 'px';
                tooltip.style.top = (landmark.y / 100 * rect.height) + 'px';
            });

            group.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });

            group.addEventListener('click', () => {
                this.showLandmarkInfo(landmark);
            });

            this.svg.appendChild(group);
        });
    }

    createLandmarkIcon(type) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', '2');
        circle.setAttribute('fill', this.getLandmarkColor(type));
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '0.5');

        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        icon.setAttribute('text-anchor', 'middle');
        icon.setAttribute('dominant-baseline', 'central');
        icon.setAttribute('font-size', '2');
        icon.setAttribute('fill', 'white');
        icon.textContent = this.getLandmarkSymbol(type);

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.appendChild(circle);
        group.appendChild(icon);

        return group;
    }

    getLandmarkColor(type) {
        const colors = {
            institute: '#e53e3e',
            transport: '#3b82f6',
            shopping: '#9f7aea',
            park: '#4caf50',
            mosque: '#059669',
            hospital: '#dc2626',
            bank: '#d97706',
            pharmacy: '#16a34a'
        };
        return colors[type] || '#6b7280';
    }

    getLandmarkSymbol(type) {
        const symbols = {
            institute: '🎓',
            transport: '🚌',
            shopping: '🛍️',
            park: '🌳',
            mosque: '🕌',
            hospital: '🏥',
            bank: '🏦',
            pharmacy: '💊'
        };
        return symbols[type] || '📍';
    }

    addControls() {
        const controls = document.createElement('div');
        controls.className = 'map-controls';

        // Zoom controls
        const zoomIn = document.createElement('button');
        zoomIn.className = 'map-control-btn';
        zoomIn.innerHTML = '<i class="fas fa-plus"></i>';
        zoomIn.onclick = () => this.zoomIn();

        const zoomOut = document.createElement('button');
        zoomOut.className = 'map-control-btn';
        zoomOut.innerHTML = '<i class="fas fa-minus"></i>';
        zoomOut.onclick = () => this.zoomOut();

        // Reset view
        const reset = document.createElement('button');
        reset.className = 'map-control-btn';
        reset.innerHTML = '<i class="fas fa-home"></i>';
        reset.onclick = () => this.resetView();

        // Toggle info
        const info = document.createElement('button');
        info.className = 'map-control-btn';
        info.innerHTML = '<i class="fas fa-info"></i>';
        info.onclick = () => this.toggleInfo();

        controls.appendChild(zoomIn);
        controls.appendChild(zoomOut);
        controls.appendChild(reset);
        controls.appendChild(info);

        this.container.appendChild(controls);
    }

    addInfoPanel() {
        this.infoPanel = document.createElement('div');
        this.infoPanel.className = 'map-info-panel';
        this.infoPanel.innerHTML = `
            <div class="info-title">${this.mapData.instituteName}</div>
            <div class="info-content">
                <div>${this.mapData.address}</div>
                <div class="transport-routes">
                    <strong>المواصلات المتاحة:</strong>
                    ${this.mapData.transportRoutes.map(route => `
                        <div class="route-item">
                            <div class="route-icon">🚌</div>
                            <div>
                                <strong>${route.name}</strong><br>
                                ${route.stops.join(' ← ')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.appendChild(this.infoPanel);
    }

    bindEvents() {
        let isDragging = false;
        let startX, startY;
        let currentTransform = { x: 0, y: 0, scale: 1 };

        // Mouse events for dragging
        this.container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - currentTransform.x;
            startY = e.clientY - currentTransform.y;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            
            currentTransform.x = e.clientX - startX;
            currentTransform.y = e.clientY - startY;
            
            this.updateTransform(currentTransform);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch events for mobile
        this.container.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                startX = e.touches[0].clientX - currentTransform.x;
                startY = e.touches[0].clientY - currentTransform.y;
            }
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            e.preventDefault();
            
            currentTransform.x = e.touches[0].clientX - startX;
            currentTransform.y = e.touches[0].clientY - startY;
            
            this.updateTransform(currentTransform);
        });

        this.container.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Store transform for zoom operations
        this.currentTransform = currentTransform;
    }

    updateTransform(transform) {
        const maxX = 50, maxY = 50;
        transform.x = Math.max(-maxX, Math.min(maxX, transform.x));
        transform.y = Math.max(-maxY, Math.min(maxY, transform.y));
        
        this.svg.style.transform = `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`;
    }

    zoomIn() {
        this.currentTransform.scale = Math.min(2, this.currentTransform.scale * 1.2);
        this.updateTransform(this.currentTransform);
    }

    zoomOut() {
        this.currentTransform.scale = Math.max(0.5, this.currentTransform.scale * 0.8);
        this.updateTransform(this.currentTransform);
    }

    resetView() {
        this.currentTransform = { x: 0, y: 0, scale: 1 };
        this.updateTransform(this.currentTransform);
    }

    toggleInfo() {
        this.infoPanel.classList.toggle('show');
    }

    showLandmarkInfo(landmark) {
        this.infoPanel.innerHTML = `
            <div class="info-title">${landmark.name}</div>
            <div class="info-content">
                <div>نوع المكان: ${this.getLandmarkTypeInArabic(landmark.type)}</div>
                <div>المسافة من المعهد: ${this.calculateDistance(landmark)} متر تقريباً</div>
                <div>وقت المشي: ${Math.ceil(this.calculateDistance(landmark) / 80)} دقائق</div>
            </div>
        `;
        this.infoPanel.classList.add('show');
    }

    getLandmarkTypeInArabic(type) {
        const types = {
            institute: 'معهد تعليمي',
            transport: 'محطة مواصلات',
            shopping: 'مركز تسوق',
            park: 'حديقة عامة',
            mosque: 'مسجد',
            hospital: 'مستشفى',
            bank: 'بنك',
            pharmacy: 'صيدلية'
        };
        return types[type] || 'مكان عام';
    }

    calculateDistance(landmark) {
        const institutePos = this.mapData.landmarks.find(l => l.type === 'institute');
        const dx = landmark.x - institutePos.x;
        const dy = landmark.y - institutePos.y;
        return Math.round(Math.sqrt(dx * dx + dy * dy) * 50); // Approximate distance in meters
    }
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Replace the placeholder map with interactive map
    const mapPlaceholder = document.querySelector('.map-container');
    if (mapPlaceholder) {
        mapPlaceholder.id = 'interactive-map';
        new InteractiveMap('interactive-map');
    }
});

// Export for global use
window.InteractiveMap = InteractiveMap;