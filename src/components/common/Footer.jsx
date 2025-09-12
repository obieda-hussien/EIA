import React from 'react'
import { useNavigation } from '@context/NavigationContext'

const Footer = () => {
  const { showSection } = useNavigation()

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-reverse space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold">المعهد المصري</h3>
                <p className="text-sm text-gray-400">أكاديمية الإسكندرية</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              28 سنة من التميز في التعليم والإعداد الأكاديمي المتميز. نفتخر بتخريج أكتر من 15000 خريج في مختلف التخصصات.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <div className="space-y-2">
              <button 
                className="block text-gray-400 hover:text-white transition text-right"
                onClick={() => showSection('about')}
                aria-label="تعرف على تاريخ ورؤية المعهد المصري"
              >
                عن المعهد
              </button>
              <button 
                className="block text-gray-400 hover:text-white transition text-right"
                onClick={() => showSection('departments')}
                aria-label="تصفح التخصصات الأكاديمية المتاحة"
              >
                التخصصات
              </button>
              <button 
                className="block text-gray-400 hover:text-white transition text-right"
                onClick={() => showSection('admissions')}
                aria-label="تعرف على شروط ومتطلبات القبول"
              >
                القبول
              </button>
              <button 
                className="block text-gray-400 hover:text-white transition text-right"
                onClick={() => showSection('results')}
                aria-label="استعلم عن النتائج والدرجات"
              >
                النتائج
              </button>
              <button 
                className="block text-gray-400 hover:text-white transition text-right"
                onClick={() => showSection('news')}
                aria-label="اطلع على آخر أخبار المعهد والفعاليات"
              >
                الأخبار
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">التخصصات</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">إدارة الأعمال</p>
              <p className="text-gray-400 text-sm">المحاسبة والمراجعة</p>
              <p className="text-gray-400 text-sm">نظم معلومات الأعمال</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">تواصل معانا</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                <i className="fas fa-map-marker-alt ml-2"></i>
                3 شارع الملك - الإسكندرية
              </p>
              <p className="text-gray-400 text-sm">
                <i className="fas fa-phone ml-2"></i>
                16000 (مجاني)
              </p>
              <p className="text-gray-400 text-sm">
                <i className="fas fa-envelope ml-2"></i>
                info@eia.edu.eg
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 المعهد المصري لأكاديمية الإسكندرية للإدارة والمحاسبة. جميع الحقوق محفوظة.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            تم التطوير بكل حب لطلاب المعهد الأعزاء ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer