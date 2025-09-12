import React, { createContext, useContext, useState, useCallback } from 'react'

const NavigationContext = createContext()

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

export const NavigationProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('home')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const showSection = useCallback((sectionId) => {
    setCurrentSection(sectionId)
    
    // Update URL hash without page reload
    if (window.location.hash !== `#${sectionId}`) {
      window.history.pushState(null, null, `#${sectionId}`)
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => {
      const newState = !prev
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = newState ? 'hidden' : ''
      return newState
    })
  }, [])

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false)
    document.body.style.overflow = ''
  }, [])

  const value = {
    currentSection,
    isSidebarOpen,
    showSection,
    toggleSidebar,
    closeSidebar
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}