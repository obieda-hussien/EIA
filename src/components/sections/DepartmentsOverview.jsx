import React from 'react'
import { useNavigation } from '@context/NavigationContext'

const DepartmentCard = ({ icon, title, description, buttonText, gradient, delay = 0 }) => {
  const { showSection } = useNavigation()

  return (
    <div 
      className="department-card p-8 rounded-2xl card-hover text-center"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-20 h-20 ${gradient} rounded-full flex items-center justify-center mx-auto mb-6 animate-float`}>
        <i className={`${icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold text-blue-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button 
        className="btn-primary px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transform transition"
        onClick={() => showSection('departments')}
        aria-label={`اعرف أكتر عن ${title}`}
      >
        {buttonText}
      </button>
    </div>
  )
}

const DepartmentsOverview = () => {
  const departments = [
    {
      icon: "fas fa-users",
      title: "[اسم التخصص الأول]",
      description: "[وصف التخصص الأول والفرص المتاحة فيه]",
      buttonText: "اعرف أكتر عن [التخصص الأول]",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
      delay: 0
    },
    {
      icon: "fas fa-calculator",
      title: "[اسم التخصص الثاني]",
      description: "[وصف التخصص الثاني والفرص المتاحة فيه]",
      buttonText: "اعرف أكتر عن [التخصص الثاني]",
      gradient: "bg-gradient-to-r from-green-500 to-green-700",
      delay: 0.5
    },
    {
      icon: "fas fa-laptop-code",
      title: "[اسم التخصص الثالث]",
      description: "[وصف التخصص الثالث والفرص المتاحة فيه]",
      buttonText: "اعرف أكتر عن [التخصص الثالث]",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-700",
      delay: 1
    }
  ]

  return (
    <div className="gradient-bg py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">اختار التخصص اللي يناسبك</h2>
          <p className="text-xl text-blue-100">[عدد التخصصات] تخصصات عصرية هتخليك جاهز لسوق العمل</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {departments.map((department, index) => (
            <DepartmentCard
              key={index}
              {...department}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DepartmentsOverview