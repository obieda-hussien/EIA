import React from 'react'
import MetaTags from '@components/common/MetaTags'
import Header from '@components/common/Header'
import Sidebar from '@components/common/Sidebar'
import Footer from '@components/common/Footer'
import ContactSection from '@components/sections/ContactSection'

const ContactPage = () => {
  return (
    <>
      <MetaTags 
        title="تواصل معنا - المعهد المصري لأكاديمية الإسكندرية"
        description="تواصل معنا عبر النموذج أو زرنا في المعهد. العنوان: 3 شارع الملك - الإسكندرية. هاتف: 16000"
      />
      
      <Header />
      <Sidebar />
      
      <main>
        <ContactSection />
      </main>
      
      <Footer />
    </>
  )
}

export default ContactPage