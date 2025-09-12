import React, { useState, useEffect } from 'react'

// Institute location coordinates
const INSTITUTE_COORDINATES = {
  lat: 31.2001,
  lng: 29.9187,
  address: "3 شارع الملك - أمام محطة قطار المنتزة - شرق الإسكندرية",
  name: "المعهد المصري لأكاديمية الإسكندرية للإدارة والمحاسبة"
}

const Map = ({ mapId = 'homeMap', className = 'h-64' }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [zoom, setZoom] = useState(1)

  const maxZoom = 3
  const minZoom = 0.5

  useEffect(() => {
    // Auto-show info for better UX
    const timer = setTimeout(() => {
      setShowInfo(true)
      // Hide after 5 seconds
      setTimeout(() => setShowInfo(false), 5000)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleMarkerClick = () => {
    setShowInfo(true)
    setTimeout(() => setShowInfo(false), 5000)
  }

  const zoomIn = () => {
    if (zoom < maxZoom) {
      setZoom(prev => prev + 0.2)
    }
  }

  const zoomOut = () => {
    if (zoom > minZoom) {
      setZoom(prev => prev - 0.2)
    }
  }

  const centerMap = () => {
    setZoom(1)
    setShowInfo(true)
    setTimeout(() => setShowInfo(false), 5000)
  }

  const getDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude
          const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`
          window.open(url, '_blank')
        },
        function(error) {
          const url = `https://www.google.com/maps/dir//${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`
          window.open(url, '_blank')
        }
      )
    } else {
      const url = `https://www.google.com/maps/dir//${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`
      window.open(url, '_blank')
    }
  }

  const openStreetView = () => {
    const url = `https://www.google.com/maps/@${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng},3a,75y,90t/data=!3m6!1e1!3m4!1s0x0:0x0!2e0!7i13312!8i6656`
    window.open(url, '_blank')
  }

  const openInMaps = () => {
    const url = `https://www.google.com/maps/place/${INSTITUTE_COORDINATES.lat},${INSTITUTE_COORDINATES.lng}`
    window.open(url, '_blank')
  }

  return (
    <div className={`map-container ${className} relative rounded-2xl overflow-hidden shadow-lg`}>
      <div 
        className="simple-map"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        <div className="map-overlay">
          <div className="institute-marker" onClick={handleMarkerClick}>
            <div className="marker-pin">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="marker-label">المعهد المصري</div>
          </div>
          
          <div className={`map-info ${showInfo ? 'visible' : ''}`}>
            <div className="info-content">
              <h3 className="font-bold text-blue-800">{INSTITUTE_COORDINATES.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                <i className="fas fa-map-marker-alt ml-2"></i> 
                {INSTITUTE_COORDINATES.address}
              </p>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={getDirections} 
                  className="map-btn directions-btn flex items-center"
                >
                  <i className="fas fa-directions ml-1"></i>
                  الاتجاهات
                </button>
                <button 
                  onClick={openStreetView} 
                  className="map-btn street-view-btn flex items-center"
                >
                  <i className="fas fa-street-view ml-1"></i>
                  عرض الشارع
                </button>
                <button 
                  onClick={openInMaps} 
                  className="map-btn open-maps-btn flex items-center"
                >
                  <i className="fas fa-external-link-alt ml-1"></i>
                  فتح في الخرائط
                </button>
              </div>
            </div>
          </div>
          
          <div className="map-controls">
            <button onClick={zoomIn} className="zoom-btn">
              <i className="fas fa-plus"></i>
            </button>
            <button onClick={zoomOut} className="zoom-btn">
              <i className="fas fa-minus"></i>
            </button>
            <button onClick={centerMap} className="zoom-btn">
              <i className="fas fa-crosshairs"></i>
            </button>
          </div>
          
          <div className="map-attribution">
            خريطة تفاعلية - {INSTITUTE_COORDINATES.name}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map