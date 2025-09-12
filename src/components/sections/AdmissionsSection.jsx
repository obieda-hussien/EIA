import React from 'react'

const AdmissionsSection = () => {
  const requirements = [
    { icon: "fas fa-graduation-cap", title: "الشهادة الثانوية", description: "شهادة الثانوية العامة أو ما يعادلها" },
    { icon: "fas fa-id-card", title: "المستندات", description: "صورة البطاقة الشخصية وشهادة الميلاد" },
    { icon: "fas fa-camera", title: "الصور", description: "6 صور شخصية خلفية بيضاء" },
    { icon: "fas fa-dollar-sign", title: "الرسوم", description: "رسوم القيد والفصل الدراسي الأول" }
  ]

  const specialties = [
    { name: "إدارة الأعمال", duration: "4 سنوات", seats: "100 مقعد" },
    { name: "المحاسبة والمراجعة", duration: "4 سنوات", seats: "80 مقعد" },
    { name: "نظم معلومات الأعمال", duration: "4 سنوات", seats: "60 مقعد" }
  ]

  const steps = [
    "املأ استمارة التقديم",
    "قدم المستندات المطلوبة", 
    "ادفع رسوم القيد",
    "احضر المقابلة الشخصية",
    "احصل على قرار القبول"
  ]

  return (
    <>
      <div className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">القبول والتسجيل</h1>
          <p className="text-xl text-blue-100">انضم لأكتر من [عدد الطلاب] طالب وطالبة في المعهد</p>
        </div>
      </div>
      
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          {/* Requirements */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">شروط القبول</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {requirements.map((req, index) => (
                <div key={index} className="text-center card-hover">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${req.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{req.title}</h3>
                  <p className="text-gray-600">{req.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">التخصصات المتاحة</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {specialties.map((specialty, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl card-hover">
                  <h3 className="text-2xl font-bold text-blue-800 mb-4">{specialty.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">مدة الدراسة:</span>
                      <span className="font-semibold">{specialty.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">عدد المقاعد:</span>
                      <span className="font-semibold text-green-600">{specialty.seats}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">خطوات التقديم</h2>
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg ml-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-800">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdmissionsSection