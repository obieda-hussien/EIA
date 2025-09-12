import React from 'react'

const NewsCard = ({ icon, title, description, date, gradient }) => {
  return (
    <div className="news-card p-6">
      <div className={`w-full h-48 ${gradient} rounded-lg mb-6 flex items-center justify-center`}>
        <i className={`${icon} text-white text-4xl`}></i>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-blue-600">
        <i className="fas fa-calendar-alt ml-2"></i>
        <span className="text-sm">{date}</span>
      </div>
    </div>
  )
}

const NewsPreview = () => {
  const newsItems = [
    {
      icon: "fas fa-graduation-cap",
      title: "[عنوان الخبر الأول]",
      description: "[محتوى الخبر الأول ووصف مختصر للحدث أو الإعلان...]",
      date: "[تاريخ الخبر الأول]",
      gradient: "bg-gradient-to-r from-blue-400 to-blue-600"
    },
    {
      icon: "fas fa-lightbulb",
      title: "[عنوان الخبر الثاني]",
      description: "[محتوى الخبر الثاني ووصف مختصر للحدث أو النشاط...]",
      date: "[تاريخ الخبر الثاني]",
      gradient: "bg-gradient-to-r from-green-400 to-green-600"
    },
    {
      icon: "fas fa-trophy",
      title: "[عنوان الخبر الثالث]",
      description: "[محتوى الخبر الثالث ووصف مختصر للإنجاز أو الجائزة...]",
      date: "[تاريخ الخبر الثالث]",
      gradient: "bg-gradient-to-r from-purple-400 to-purple-600"
    }
  ]

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">آخر الأخبار والفعاليات</h2>
          <p className="text-xl text-gray-600">خليك متابع كل جديد في المؤسسة</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsCard
              key={index}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsPreview