import React, { useState } from 'react'
import Map from '@components/ui/Map'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

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

    // Simulate form submission
    setTimeout(() => {
      alert('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setIsLoading(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'العنوان',
      details: '3 شارع الملك - أمام محطة قطار المنتزة - شرق الإسكندرية',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: 'fas fa-phone',
      title: 'التليفون',
      details: '16000 (مجاني)\n03-4567890',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: 'fas fa-envelope',
      title: 'البريد الإلكتروني',
      details: 'info@eia.edu.eg\nadmissions@eia.edu.eg',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: 'fas fa-clock',
      title: 'مواعيد العمل',
      details: 'الأحد - الخميس: 9 ص - 3 ع\nالسبت: 9 ص - 1 ظ\nالجمعة: مغلق',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ]

  const socialLinks = [
    { icon: 'fab fa-facebook-f', name: 'فيسبوك', url: '[رابط الفيسبوك]', color: 'bg-blue-600' },
    { icon: 'fab fa-twitter', name: 'تويتر', url: '[رابط تويتر]', color: 'bg-sky-500' },
    { icon: 'fab fa-linkedin-in', name: 'لينكد إن', url: '[رابط لينكد إن]', color: 'bg-blue-700' },
    { icon: 'fab fa-instagram', name: 'إنستجرام', url: '[رابط إنستجرام]', color: 'bg-pink-600' },
    { icon: 'fab fa-youtube', name: 'يوتيوب', url: '[رابط يوتيوب]', color: 'bg-red-600' }
  ]

  return (
    <>
      <div className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">تواصل معنا</h1>
          <p className="text-xl text-blue-100">نحن هنا لمساعدتك والرد على استفساراتك</p>
        </div>
      </div>
      
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          {/* Contact Info */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center card-hover">
                <div className={`w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${info.icon} ${info.color} text-2xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{info.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                <i className="fas fa-paper-plane text-blue-600 ml-3"></i>
                أرسل لنا رسالة
              </h2>
              
              <form onSubmit={handleSubmit} className="contact-form space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">الاسم الكامل *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none"
                      placeholder="اكتب اسمك الكامل"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">رقم التليفون *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg focus:outline-none"
                      placeholder="01xxxxxxxxx"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الموضوع *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg focus:outline-none"
                    placeholder="موضوع الرسالة"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الرسالة *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg focus:outline-none resize-none"
                    placeholder="اكتب رسالتك هنا..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-4 rounded-lg text-white font-bold text-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin ml-2"></i>
                      جاري الإرسال...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane ml-2"></i>
                      إرسال الرسالة
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Social Links */}
            <div className="space-y-8">
              {/* Map */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">موقعنا على الخريطة</h3>
                <Map mapId="contactMap" className="h-80" />
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">تابعنا على</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-4 rounded-lg flex items-center justify-center hover:opacity-90 transition`}
                    >
                      <i className={`${social.icon} text-xl ml-2`}></i>
                      <span className="font-semibold">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactSection