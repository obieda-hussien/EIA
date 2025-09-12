import React from 'react'
import MetaTags from '@components/common/MetaTags'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import DepartmentsSection from '@components/sections/DepartmentsSection'

const DepartmentsPage = () => {
  return (
    <>
      <MetaTags 
        title="التخصصات - المعهد المصري لأكاديمية الإسكندرية"
        description="تعرف على التخصصات المتاحة: إدارة الأعمال، المحاسبة والمراجعة، ونظم معلومات الأعمال. 3 تخصصات عصرية ومطلوبة في سوق العمل."
      />
      
      <Header />
      <Sidebar />
      
      <main>
        <DepartmentsSection />
      </main>
      
      <Footer />
    </>
  )
}

export default DepartmentsPage