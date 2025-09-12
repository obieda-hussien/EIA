import React, { Suspense, lazy, useEffect } from 'react'
import { useNavigation } from '@context/NavigationContext'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import LoadingSpinner from '@components/ui/LoadingSpinner'
import Hero from '@components/sections/Hero'
import Stats from '@components/sections/Stats'
import DepartmentsOverview from '@components/sections/DepartmentsOverview'
import NewsPreview from '@components/sections/NewsPreview'
import ContactInfo from '@components/sections/ContactInfo'

// Lazy load heavy sections
const AboutSection = lazy(() => import('@components/sections/AboutSection'))
const DepartmentsSection = lazy(() => import('@components/sections/DepartmentsSection'))
const AdmissionsSection = lazy(() => import('@components/sections/AdmissionsSection'))
const ResultsSection = lazy(() => import('@components/sections/ResultsSection'))
const NewsSection = lazy(() => import('@components/sections/NewsSection'))
const ContactSection = lazy(() => import('@components/sections/ContactSection'))

const SinglePageApp = () => {
  const { currentSection } = useNavigation()

  useEffect(() => {
    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      if (hash) {
        // The navigation context will handle this
      }
    }

    // Initialize with hash if present
    const hash = window.location.hash.substring(1)
    if (hash) {
      // The navigation context will handle this
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <>
            <Hero />
            <Stats />
            <DepartmentsOverview />
            <NewsPreview />
            <ContactInfo />
          </>
        )
      
      case 'about':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutSection />
          </Suspense>
        )
      
      case 'departments':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <DepartmentsSection />
          </Suspense>
        )
      
      case 'admissions':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <AdmissionsSection />
          </Suspense>
        )
      
      case 'results':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ResultsSection />
          </Suspense>
        )
      
      case 'news':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <NewsSection />
          </Suspense>
        )
      
      case 'contact':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactSection />
          </Suspense>
        )
      
      default:
        return (
          <>
            <Hero />
            <Stats />
            <DepartmentsOverview />
            <NewsPreview />
            <ContactInfo />
          </>
        )
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      
      <main className="min-h-screen">
        {renderSection()}
      </main>
      
      <Footer />
    </>
  )
}

export default SinglePageApp