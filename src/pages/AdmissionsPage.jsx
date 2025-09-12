import React from 'react'
import MetaTags from '@components/common/MetaTags'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import AdmissionsSection from '@components/sections/AdmissionsSection'

const AdmissionsPage = () => {
  return (
    <>
      <MetaTags 
        title="القبول والتسجيل - المعهد المصري لأكاديمية الإسكندرية"
        description="تعرف على شروط القبول وخطوات التسجيل في المعهد. انضم لأكثر من 5000 طالب وطالبة في المعهد المصري."
      />
      
      <Header />
      <Sidebar />
      
      <main>
        <AdmissionsSection />
      </main>
      
      <Footer />
    </>
  )
}

export default AdmissionsPage