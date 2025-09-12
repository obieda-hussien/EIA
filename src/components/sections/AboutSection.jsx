import React from 'react'

const TimelineItem = ({ year, title, description, color }) => (
  <div className="timeline-item">
    <div className="mr-12">
      <div className={`${color} p-6 rounded-lg`}>
        <h3 className={`text-xl font-bold mb-2 ${color === 'bg-blue-50' ? 'text-blue-800' : 
          color === 'bg-green-50' ? 'text-green-800' : 
          color === 'bg-purple-50' ? 'text-purple-800' : 'text-orange-800'}`}>
          {year} - {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
)

const VisionMissionCard = ({ icon, title, description, gradient }) => (
  <div className={`${gradient} p-8 rounded-2xl`}>
    <div className="text-center mb-6">
      <div className={`w-16 h-16 ${gradient.includes('blue') ? 'bg-blue-600' : 'bg-green-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <i className={`${icon} text-white text-2xl`}></i>
      </div>
      <h3 className={`text-2xl font-bold ${gradient.includes('blue') ? 'text-blue-800' : 'text-green-800'}`}>{title}</h3>
    </div>
    <p className="text-gray-700 text-center">{description}</p>
  </div>
)

const AchievementCard = ({ icon, value, label }) => (
  <div className="card-hover">
    <div className="bg-white bg-opacity-20 p-6 rounded-2xl text-center">
      <i className={`${icon} text-4xl mb-4`}></i>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <p>{label}</p>
    </div>
  </div>
)

const AboutSection = () => {
  const timelineItems = [
    {
      year: "[سنة التأسيس]",
      title: "البداية",
      description: "تأسيس المؤسسة بالقرار الوزاري رقم [رقم القرار] مع [عدد الطلاب البداية] طالب وطالبة",
      color: "bg-blue-50"
    },
    {
      year: "[سنة أول تخرج]",
      title: "أول تخرج",
      description: "تخرج أول دفعة في [شهر وسنة أول تخرج] - بداية قصة نجاح",
      color: "bg-green-50"
    },
    {
      year: "[سنة الانتقال]",
      title: "المقر الجديد",
      description: "انتقال للمقر الحالي في [اسم الشارع الجديد] لخدمة أفضل",
      color: "bg-purple-50"
    },
    {
      year: "[السنة الحالية]",
      title: "النجاح المستمر",
      description: "أكتر من [عدد الطلاب الحالي] طالب وطالبة يدرسوا في المؤسسة",
      color: "bg-orange-50"
    }
  ]

  const achievements = [
    { icon: "fas fa-users", value: "[عدد الطلاب]+", label: "طالب وطالبة حالياً" },
    { icon: "fas fa-graduation-cap", value: "15000+", label: "خريج ناجح" },
    { icon: "fas fa-building", value: "85%", label: "معدل التوظيف" },
    { icon: "fas fa-star", value: "28", label: "سنة من التميز" }
  ]

  return (
    <>
      {/* Header */}
      <div className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">عن [اسم المؤسسة]</h1>
          <p className="text-xl text-blue-100">[سنوات الخبرة] سنة من التميز والإبداع في التعليم</p>
        </div>
      </div>
      
      {/* Story Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">قصة نجاح من [سنة التأسيس]</h2>
              <p className="text-lg text-gray-600 mb-6">
                بدأنا بحلم كبير وشوية طلاب عايزين يحققوا أحلامهم. من [عدد الطلاب في البداية] طالب في البداية لـ [عدد الطلاب الحالي]+ طالب دلوقتي!
              </p>
              <p className="text-lg text-gray-600 mb-6">
                [اسم المؤسسة] اتأسست بالقرار الوزاري رقم [رقم القرار] سنة [سنة التأسيس]، وكان هدفنا دايماً إننا نقدم تعليم عالي الجودة يخلي طلابنا جاهزين لسوق العمل.
              </p>
              <p className="text-lg text-gray-600">
                سنة [سنة الانتقال] انتقلنا لمقرنا الجديد في [اسم الشارع الجديد] عشان نوفر بيئة تعليمية أفضل لطلابنا الحبايب.
              </p>
            </div>
            
            <div className="animate-float">
              <div className="w-full h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <i className="fas fa-university text-6xl mb-4"></i>
                  <h3 className="text-2xl font-bold">مبنى المؤسسة</h3>
                  <p>موقع متميز وسهل الوصول</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">رحلة النجاح</h2>
            <div className="relative">
              <div className="absolute right-4 top-0 bottom-0 w-1 bg-blue-200"></div>
              
              {timelineItems.map((item, index) => (
                <TimelineItem key={index} {...item} />
              ))}
            </div>
          </div>
          
          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-12">
            <VisionMissionCard
              icon="fas fa-eye"
              title="رؤيتنا"
              description="نكون المعهد الرائد في تخريج كوادر مؤهلة قادرة على المنافسة في سوق العمل المحلي والإقليمي، ونساهم في التنمية الاقتصادية والاجتماعية."
              gradient="bg-gradient-to-r from-blue-50 to-blue-100"
            />
            
            <VisionMissionCard
              icon="fas fa-bullseye"
              title="رسالتنا"
              description="تقديم تعليم عالي الجودة في مجالات الإدارة والمحاسبة وتكنولوجيا المعلومات، وإعداد خريجين مؤهلين بالمهارات اللازمة لسوق العمل."
              gradient="bg-gradient-to-r from-green-50 to-green-100"
            />
          </div>
        </div>
      </div>
      
      {/* Achievements */}
      <div className="gradient-bg py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">إنجازاتنا الفخورين بيها</h2>
          
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {achievements.map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutSection