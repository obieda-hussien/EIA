import React from 'react'
import MetaTags from '@components/common/MetaTags'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import AboutSection from '@components/sections/AboutSection'

const AboutPage = () => {
  return (
    <>
      <MetaTags 
        title="عن المعهد - المعهد المصري لأكاديمية الإسكندرية"
        description="تعرف على تاريخ ورؤية ورسالة المعهد المصري. 28 سنة من التميز في التعليم وأكثر من 15000 خريج ناجح."
      />
      
      <Header />
      <Sidebar />
      
      <main>
        <AboutSection />
      </main>
      
      <Footer />
    </>
  )
}

export default AboutPage