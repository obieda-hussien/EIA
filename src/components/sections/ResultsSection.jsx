import React, { useState } from 'react'

const ResultsSection = () => {
  const [formData, setFormData] = useState({
    studentCode: '',
    nationalId: '',
    captcha: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  // Generate random captcha
  const generateCaptcha = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const [captchaText] = useState(generateCaptcha())

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      alert('عذراً، النتائج غير متاحة حالياً. برجاء المحاولة لاحقاً أو الاتصال بشؤون الطلاب.')
      setIsLoading(false)
    }, 2000)
  }

  return (
    <>
      <div className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">النتائج والدرجات</h1>
          <p className="text-xl text-blue-100">استعلم عن نتيجتك بسهولة</p>
        </div>
      </div>
      
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="results-form">
              <div className="text-center mb-8">
                <i className="fas fa-search text-blue-600 text-4xl mb-4"></i>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">البحث عن النتيجة</h2>
                <p className="text-gray-600">أدخل البيانات المطلوبة للاستعلام عن النتيجة</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    كود الطالب *
                  </label>
                  <input
                    type="text"
                    name="studentCode"
                    value={formData.studentCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none"
                    placeholder="أدخل كود الطالب"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الرقم القومي *
                  </label>
                  <input
                    type="text"
                    name="nationalId" 
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none"
                    placeholder="أدخل الرقم القومي (14 رقم)"
                    maxLength="14"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    كود التحقق *
                  </label>
                  <div className="flex items-center space-x-reverse space-x-4">
                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 rounded-lg border-2 focus:border-blue-500 focus:outline-none"
                      placeholder="أدخل كود التحقق"
                      required
                    />
                    <div className="captcha-box">
                      {captchaText}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary px-8 py-3 rounded-full text-white font-bold text-lg disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin ml-2"></i>
                        جاري البحث...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search ml-2"></i>
                        البحث عن النتيجة
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">
                  <i className="fas fa-info-circle ml-2"></i>
                  معلومات مهمة
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• تأكد من صحة كود الطالب والرقم القومي</li>
                  <li>• النتائج متاحة خلال 48 ساعة من انتهاء الامتحانات</li>
                  <li>• للاستفسار اتصل بشؤون الطلاب على: [رقم الهاتف]</li>
                  <li>• يمكن طباعة النتيجة من خلال المتصفح</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResultsSection