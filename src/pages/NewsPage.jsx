import React from 'react'
import MetaTags from '@components/common/MetaTags'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import NewsSection from '@components/sections/NewsSection'

const NewsPage = () => {
  return (
    <>
      <MetaTags 
        title="الأخبار والفعاليات - المعهد المصري لأكاديمية الإسكندرية"
        description="اطلع على آخر أخبار المعهد والفعاليات القادمة. احتفالات التخرج، ورش العمل، والأنشطة الطلابية."
      />
      
      <Header />
      <Sidebar />
      
      <main>
        <NewsSection />
      </main>
      
      <Footer />
    </>
  )
}

export default NewsPage