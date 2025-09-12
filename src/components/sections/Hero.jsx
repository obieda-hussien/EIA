import React from 'react'
import { useNavigation } from '@context/NavigationContext'

const Hero = () => {
  const { showSection } = useNavigation()

  return (
    <div className="hero-gradient text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-slide-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">أهلاً بيك في [اسم المؤسسة]!</h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">مستقبلك يبدأ من هنا.. انضم لأكتر من [عدد الطلاب] طالب وطالبة</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-reverse md:space-x-6">
            <button 
              className="btn-primary px-8 py-4 rounded-full text-white font-bold text-lg hover:scale-105 transform transition"
              onClick={() => showSection('departments')}
              aria-label="اختيار التخصص المناسب"
            >
              <i className="fas fa-rocket ml-2"></i>
              اختار تخصصك دلوقتي
            </button>
            <button 
              className="bg-transparent border-2 border-white px-8 py-4 rounded-full text-white font-bold text-lg hover:bg-white hover:text-blue-800 transition"
              onClick={() => showSection('about')}
              aria-label="تعرف على المؤسسة وتاريخها"
            >
              <i className="fas fa-play ml-2"></i>
              اعرف عننا أكتر
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero