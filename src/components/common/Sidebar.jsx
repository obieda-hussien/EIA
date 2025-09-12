import React, { useEffect } from 'react'
import { useNavigation } from '@context/NavigationContext'

const Sidebar = () => {
  const { currentSection, isSidebarOpen, showSection, closeSidebar } = useNavigation()

  const navigationItems = [
    { id: 'home', icon: 'fas fa-home', label: 'الرئيسية' },
    { id: 'about', icon: 'fas fa-university', label: 'عن المعهد' },
    { id: 'departments', icon: 'fas fa-graduation-cap', label: 'الأقسام' },
    { id: 'admissions', icon: 'fas fa-user-plus', label: 'القبول' },
    { id: 'results', icon: 'fas fa-chart-line', label: 'النتائج' },
    { id: 'news', icon: 'fas fa-newspaper', label: 'الأخبار' },
    { id: 'contact', icon: 'fas fa-envelope', label: 'التواصل' }
  ]

  const handleNavItemClick = (sectionId) => {
    showSection(sectionId)
    closeSidebar()
  }

  useEffect(() => {
    // Close sidebar with Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeSidebar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeSidebar])

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <button 
          className="sidebar-close absolute top-4 left-4 bg-white bg-opacity-20 border-none text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white hover:bg-opacity-30 hover:rotate-90"
          onClick={closeSidebar}
          aria-label="إغلاق قائمة التنقل"
        >
          <i className="fas fa-times"></i>
        </button>
        
        <div className="sidebar-header p-8 border-b border-white border-opacity-20 text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-graduation-cap text-white text-2xl"></i>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">[اسم المؤسسة]</h2>
          <p className="text-blue-100 text-sm">[اسم الأكاديمية للإدارة والمحاسبة]</p>
        </div>
        
        <nav className="sidebar-nav py-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item w-full text-right ${
                currentSection === item.id ? 'active' : ''
              }`}
              onClick={() => handleNavItemClick(item.id)}
            >
              <i className={`${item.icon} w-6 ml-4 text-center text-lg`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="px-6 py-4 mt-auto border-t border-white border-opacity-20">
          <div className="text-center text-white text-opacity-80 text-sm">
            <p className="mb-2">تواصل معنا</p>
            <div className="flex justify-center space-x-reverse space-x-4">
              <a 
                href="tel:[رقم الهاتف]" 
                className="text-white hover:text-blue-200 transition"
                aria-label="اتصل بالمؤسسة على رقم الهاتف"
              >
                <i className="fas fa-phone"></i>
              </a>
              <a 
                href="mailto:[البريد الإلكتروني]" 
                className="text-white hover:text-blue-200 transition"
                aria-label="راسل المؤسسة عبر البريد الإلكتروني"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a 
                href="[رابط الفيسبوك]" 
                className="text-white hover:text-blue-200 transition"
                aria-label="تابع المؤسسة على فيسبوك"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar