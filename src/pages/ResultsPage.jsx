import React from 'react'
import MetaTags from '@components/common/MetaTags'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import ResultsSection from '@components/sections/ResultsSection'

const ResultsPage = () => {
  return (
    <>
      <MetaTags 
        title="النتائج - المعهد المصري لأكاديمية الإسكندرية"
        description="استعلم عن نتائجك بسهولة. أدخل كود الطالب والرقم القومي للحصول على درجاتك فوراً."
      />
      
      <Header />
      <Sidebar />
      
      <main>
        <ResultsSection />
      </main>
      
      <Footer />
    </>
  )
}

export default ResultsPage