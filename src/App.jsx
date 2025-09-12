import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { NavigationProvider } from '@context/NavigationContext'
import MetaTags from '@components/common/MetaTags'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'

// Lazy load pages for better performance
const HomePage = lazy(() => import('@pages/HomePage'))
const AboutPage = lazy(() => import('@pages/AboutPage'))
const DepartmentsPage = lazy(() => import('@pages/DepartmentsPage'))
const AdmissionsPage = lazy(() => import('@pages/AdmissionsPage'))
const ResultsPage = lazy(() => import('@pages/ResultsPage'))
const NewsPage = lazy(() => import('@pages/NewsPage'))
const ContactPage = lazy(() => import('@pages/ContactPage'))

// Single page mode (for current structure)
const SinglePageApp = lazy(() => import('@pages/SinglePageApp'))

function App() {
  useEffect(() => {
    // Initialize hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash && document.getElementById(hash)) {
        // This will be handled by navigation context
      }
    }

    // Initialize page with hash if present
    const hash = window.location.hash.substring(1)
    if (hash && document.getElementById(hash)) {
      // This will be handled by navigation context
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-gray-50">
        <MetaTags />
        
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Single Page App (current structure) */}
            <Route path="/" element={<SinglePageApp />} />
            
            {/* Individual pages (for future expansion) */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </NavigationProvider>
  )
}

export default App