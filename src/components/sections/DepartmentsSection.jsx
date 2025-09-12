import React from 'react'

const DepartmentDetailCard = ({ 
  icon, 
  title, 
  subtitle, 
  description, 
  features, 
  skills, 
  duration,
  iconBg,
  titleColor,
  skillsBg,
  reverse = false 
}) => (
  <div className="bg-white rounded-2xl p-8 mb-12 shadow-lg">
    <div className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className={reverse ? 'order-2 md:order-1' : ''}>
        {skills && (
          <div className={`${skillsBg} p-8 rounded-2xl text-center`}>
            <i className={`${icon.replace('text-white', titleColor)} text-4xl mb-4`}></i>
            <h3 className={`text-xl font-bold ${titleColor} mb-4`}>
              {reverse ? 'المهارات المكتسبة' : 'فرص العمل'}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white p-3 rounded-lg">{skill}</div>
              ))}
            </div>
            <div className={`mt-4 p-3 ${titleColor.includes('green') ? 'bg-green-600' : titleColor.includes('blue') ? 'bg-blue-600' : 'bg-purple-600'} text-white rounded-lg`}>
              <strong>{duration}</strong>
            </div>
          </div>
        )}
      </div>
      
      <div className={reverse ? 'order-1 md:order-2' : ''}>
        <div className="flex items-center mb-6">
          <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center ml-4`}>
            <i className={`${icon} text-white text-2xl`}></i>
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${titleColor}`}>{title}</h2>
            <p className={titleColor.replace('800', '600')}>{subtitle}</p>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 mb-6">{description}</p>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <i className={`fas fa-check-circle ${titleColor.replace('800', '500')} ml-3`}></i>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const DepartmentsSection = () => {
  const departments = [
    {
      icon: "fas fa-users",
      title: "إدارة الأعمال",
      subtitle: "Business Administration",
      description: "تخصص إدارة الأعمال هيخليك قادر تدير أي مشروع أو شركة بطريقة احترافية. هتتعلم إزاي تاخد قرارات صحيحة وتدير الفرق وتحقق الأهداف.",
      features: [
        "إدارة الموارد البشرية والتسويق",
        "التخطيط الاستراتيجي وإدارة المشاريع", 
        "إدارة العمليات والجودة",
        "ريادة الأعمال والابتكار"
      ],
      skills: [
        "مدير عام",
        "مدير مبيعات", 
        "مدير موارد بشرية",
        "رائد أعمال",
        "مدير مشروع",
        "مستشار إداري"
      ],
      duration: "مدة الدراسة: 4 سنوات",
      iconBg: "bg-gradient-to-r from-blue-500 to-blue-700",
      titleColor: "text-blue-800",
      skillsBg: "bg-gradient-to-r from-blue-100 to-blue-200",
      reverse: false
    },
    {
      icon: "fas fa-calculator",
      title: "المحاسبة والمراجعة", 
      subtitle: "Accounting & Auditing",
      description: "تخصص المحاسبة والمراجعة هيخليك محاسب محترف قادر تشتغل في أكبر الشركات والبنوك. التخصص ده مطلوب في كل مكان ومضمون الشغل فيه.",
      features: [
        "إعداد القوائم المالية والميزانيات",
        "مراجعة وتدقيق الحسابات",
        "المحاسبة الضريبية والزكاة", 
        "استخدام البرامج المحاسبية الحديثة"
      ],
      skills: [
        "المحاسبة المالية",
        "محاسبة التكاليف",
        "المراجعة والتدقيق",
        "الضرائب",
        "التحليل المالي",
        "البرامج المحاسبية"
      ],
      duration: "معادلة بكالوريوس التجارة",
      iconBg: "bg-gradient-to-r from-green-500 to-green-700",
      titleColor: "text-green-800", 
      skillsBg: "bg-gradient-to-r from-green-100 to-green-200",
      reverse: true
    },
    {
      icon: "fas fa-laptop-code",
      title: "نظم معلومات الأعمال",
      subtitle: "Business Information Systems", 
      description: "تخصص المستقبل اللي بيربط بين التكنولوجيا والإدارة. هتتعلم إزاي تستخدم التكنولوجيا في حل مشاكل الأعمال وتطوير الأنظمة.",
      features: [
        "تطوير وإدارة الأنظمة المعلوماتية",
        "تحليل البيانات والذكاء الاصطناعي",
        "إدارة قواعد البيانات والشبكات",
        "تطوير المواقع والتطبيقات"
      ],
      skills: [
        "محلل أنظمة",
        "مطور تطبيقات",
        "مدير IT",
        "محلل بيانات", 
        "مصمم مواقع",
        "استشاري تقني"
      ],
      duration: "تخصص المستقبل والتكنولوجيا",
      iconBg: "bg-gradient-to-r from-purple-500 to-purple-700",
      titleColor: "text-purple-800",
      skillsBg: "bg-gradient-to-r from-purple-100 to-purple-200", 
      reverse: false
    }
  ]

  return (
    <>
      {/* Header */}
      <div className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">التخصصات المتاحة</h1>
          <p className="text-xl text-blue-100">3 تخصصات عصرية ومطلوبة في سوق العمل</p>
        </div>
      </div>
      
      {/* Departments Details */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          {departments.map((department, index) => (
            <DepartmentDetailCard key={index} {...department} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DepartmentsSection