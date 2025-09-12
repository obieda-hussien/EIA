import React from 'react'
import { useNavigation } from '@context/NavigationContext'

const Header = () => {
  const { toggleSidebar } = useNavigation()

  return (
    <header className="top-header bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-reverse space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-800">[اسم المؤسسة]</h1>
              <p className="text-sm text-gray-600">[اسم الأكاديمية]</p>
            </div>
          </div>
          
          <button 
            className="menu-toggle bg-none border-none text-blue-800 text-2xl cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:scale-110"
            onClick={toggleSidebar}
            aria-label="فتح قائمة التنقل"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header