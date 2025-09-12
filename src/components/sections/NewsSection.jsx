import React, { useState } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

const NewsCard = ({ id, icon, title, description, date, gradient, onReadMore }) => (
  <div className="news-card p-6">
    <div className={`w-full h-48 ${gradient} rounded-lg mb-6 flex items-center justify-center`}>
      <i className={`${icon} text-white text-4xl`}></i>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center text-blue-600">
        <i className="fas fa-calendar-alt ml-2"></i>
        <span className="text-sm">{date}</span>
      </div>
      <button
        onClick={() => onReadMore(id)}
        className="text-blue-600 hover:text-blue-800 font-semibold"
      >
        اقرأ المزيد
      </button>
    </div>
  </div>
)

const EventCard = ({ id, title, date, time, location, description, onRegister }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg card-hover">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center ml-4">
        <i className="fas fa-calendar-alt text-orange-600"></i>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{date} - {time}</p>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        <i className="fas fa-map-marker-alt ml-1"></i>
        {location}
      </div>
      <button
        onClick={() => onRegister(id)}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
      >
        سجل الآن
      </button>
    </div>
  </div>
)

const NewsSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)

  const newsItems = [
    {
      id: 'graduation-celebration',
      icon: "fas fa-graduation-cap",
      title: "احتفالية تخرج الدفعة 28",
      description: "احتفل المعهد بتخرج أكثر من 500 طالب وطالبة من مختلف التخصصات في حفل مميز حضره أولياء الأمور والشخصيات المهمة.",
      date: "15 يونيو 2024",
      gradient: "bg-gradient-to-r from-blue-400 to-blue-600"
    },
    {
      id: 'excellence-award',
      icon: "fas fa-trophy",
      title: "المعهد يحصل على جائزة التميز",
      description: "حصل المعهد على جائزة أفضل معهد تعليمي في الإسكندرية للعام الثالث على التوالي.",
      date: "10 يوليو 2024",
      gradient: "bg-gradient-to-r from-green-400 to-green-600"
    },
    {
      id: 'company-partnership',
      icon: "fas fa-handshake",
      title: "شراكة جديدة مع أكبر الشركات",
      description: "وقع المعهد بروتوكولات تعاون مع مجموعة من أكبر الشركات لتدريب الطلاب وتوفير فرص عمل.",
      date: "25 يونيو 2024",
      gradient: "bg-gradient-to-r from-purple-400 to-purple-600"
    }
  ]

  const events = [
    {
      id: 'entrepreneurship-workshop',
      title: 'ورشة ريادة الأعمال',
      date: '20 يوليو 2024',
      time: '10 صباحاً - 2 عصراً',
      location: 'قاعة المؤتمرات الكبرى',
      description: 'ورشة عمل مجانية لتعليم الطلاب كيفية بدء مشروعهم الخاص'
    },
    {
      id: 'alumni-meeting',
      title: 'لقاء الخريجين السنوي',
      date: '5 أغسطس 2024',
      time: '6 مساءً - 9 مساءً',
      location: 'قاعة الاحتفالات',
      description: 'لقاء سنوي مع الخريجين الناجحين لمشاركة الخبرات'
    },
    {
      id: 'excel-course',
      title: 'دورة Excel المتقدمة',
      date: '12 أغسطس 2024', 
      time: '3 أيام متتالية',
      location: 'معمل الحاسب الآلي',
      description: 'دورة تدريبية مكثفة في برنامج Excel للطلاب والخريجين'
    }
  ]

  const handleReadMore = (articleId) => {
    setSelectedArticle(articleId)
    setIsArticleModalOpen(true)
  }

  const handleRegister = (eventId) => {
    setSelectedEvent(eventId)
    setIsEventModalOpen(true)
  }

  return (
    <>
      <div className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">الأخبار والفعاليات</h1>
          <p className="text-xl text-blue-100">اطلع على آخر أخبار المعهد والأنشطة القادمة</p>
        </div>
      </div>
      
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          {/* Latest News */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">آخر الأخبار</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <NewsCard
                  key={item.id}
                  {...item}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">الفعاليات القادمة</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <Modal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        title={selectedArticle ? newsItems.find(item => item.id === selectedArticle)?.title : ''}
      >
        <div className="prose max-w-none">
          <p>محتوى المقال سيتم عرضه هنا...</p>
        </div>
      </Modal>

      {/* Event Registration Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title={`تسجيل في ${selectedEvent ? events.find(event => event.id === selectedEvent)?.title : ''}`}
      >
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">الاسم الكامل *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" 
                placeholder="اكتب اسمك الكامل" 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">رقم التليفون *</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" 
                placeholder="01xxxxxxxxx" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني *</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none" 
              placeholder="example@email.com" 
            />
          </div>
          
          <div className="flex justify-end space-x-reverse space-x-4">
            <button 
              type="button" 
              onClick={() => setIsEventModalOpen(false)}
              className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              تأكيد التسجيل
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default NewsSection