import React from 'react'

const LoadingSpinner = ({ size = 'large', color = 'blue' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600'
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
        <div className="text-blue-800 font-semibold">
          <div className="flex items-center justify-center space-x-reverse space-x-2">
            <i className="fas fa-graduation-cap text-2xl text-blue-600"></i>
            <div>
              <p className="text-lg">جاري التحميل...</p>
              <p className="text-sm text-gray-600">المعهد المصري</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner