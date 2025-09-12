import React from 'react'
import Map from '@components/ui/Map'

const ContactInfo = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تعال زورنا في المؤسسة!</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-blue-600"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">العنوان</h4>
                  <p className="text-gray-600">[عنوان المؤسسة الكامل - الشارع - المنطقة - المدينة]</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-clock text-green-600"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">مواعيد العمل</h4>
                  <p className="text-gray-600">من 9 صباحاً إلى 3 عصراً (عدا الجمعة)</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-reverse space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-phone text-purple-600"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">التليفون</h4>
                  <p className="text-gray-600">[رقم الهاتف] - اتصل بنا دلوقتي للاستفسار</p>
                </div>
              </div>
            </div>
          </div>
          
          <Map mapId="homeMap" className="h-64" />
        </div>
      </div>
    </div>
  )
}

export default ContactInfo