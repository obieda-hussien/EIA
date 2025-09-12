import React from 'react'
import MetaTags from '@components/common/MetaTags'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import Hero from '@components/sections/Hero'
import Stats from '@components/sections/Stats'
import DepartmentsOverview from '@components/sections/DepartmentsOverview'
import NewsPreview from '@components/sections/NewsPreview'
import ContactInfo from '@components/sections/ContactInfo'

const HomePage = () => {
  return (
    <>
      <MetaTags 
        title="المعهد المصري - أكاديمية الإسكندرية للإدارة والمحاسبة"
        description="أفضل معهد تعليم عالي في مصر. تخصصات إدارة الأعمال، المحاسبة والمراجعة، ونظم معلومات الأعمال. أكثر من 5000 طالب و28 سنة خبرة."
      />
      
      <Header />
      <Sidebar />
      
      <main>
        <Hero />
        <Stats />
        <DepartmentsOverview />
        <NewsPreview />
        <ContactInfo />
      </main>
      
      <Footer />
    </>
  )
}

export default HomePage