import React, { useState } from 'react';
import { Heart, Shield, Star, Users, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  setAutoLoginParent?: (value: boolean) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, setAutoLoginParent }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  
  const values = [
    {
      icon: Shield,
      title: 'Güvenlik',
      description: 'Çocukların güvenliği bizim önceliğimiz',
      color: 'text-blue-600',
    },
    {
      icon: Heart,
      title: 'Sevgi',
      description: 'Her şeyi sevgiyle ve özenle tasarlıyoruz',
      color: 'text-red-600',
    },
    {
      icon: Star,
      title: 'Kalite',
      description: 'En iyi eğitim deneyimini sunuyoruz',
      color: 'text-yellow-600',
    },
    {
      icon: Users,
      title: 'Aile',
      description: 'Aileleri bir araya getiriyoruz',
      color: 'text-green-600',
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
              <span className="font-medium">Ana Sayfa</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Hakkımızda 👨‍👩‍👧
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Çocukların eğlenerek öğrenmesi için tasarlanmış güvenli bir platform
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
            Misyonumuz 🎯
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            ÇocukDünyası, çocukların dijital dünyada güvenli bir şekilde eğlenerek öğrenmelerini sağlamak için oluşturulmuştur. 
            Eğitici oyunlar, yaratıcı aktiviteler ve aileler için kontrol araçları ile çocuklarınızın gelişimine katkıda bulunuyoruz.
          </p>
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              "Öğrenme eğlenceli olmalı!" 🌟
            </h3>
            <p className="text-gray-700">
              Bu inançla, her yaş grubundan çocuk için uygun, eğitici ve güvenli içerikler üretiyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Değerlerimiz ⭐
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gray-50 rounded-3xl p-8 group-hover:shadow-lg transition-all duration-300">
                    <Icon 
                      className={`w-12 h-12 mx-auto mb-4 ${value.color} group-hover:animate-bounce cursor-pointer`} 
                      onClick={() => {
                        if (value.title === 'Kalite') {
                          setShowEmailForm(true);
                        }
                      }}
                    />
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Neler Sunuyoruz? 🎁
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Eğitici Oyunlar</h3>
              <p className="text-gray-600">
                Yaş grubuna uygun, öğretici ve eğlenceli oyunlar ile çocukların gelişimini destekliyoruz.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Güvenli Ortam</h3>
              <p className="text-gray-600">
                Reklamsız, güvenli ve çocuk dostu bir dijital ortam sağlıyoruz.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
              <div className="text-4xl mb-4">👪</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Ebeveyn Kontrolü</h3>
              <p className="text-gray-600">
                Aileler için kapsamlı kontrol ve takip araçları sunuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Parent Panel Modal */}
      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-600" />
                E-posta Adresinizi Giriniz
              </h2>
              <button
                onClick={() => {
                  setShowEmailForm(false);
                  setEmailInput('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  E-posta Adresiniz
                </label>
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowEmailForm(false);
                    setEmailInput('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    if (emailInput === 'ebeveyn123') {
                      if (setAutoLoginParent) {
                        setAutoLoginParent(true);
                      }
                      onNavigate('parent');
                      setShowEmailForm(false);
                      setEmailInput('');
                    } else {
                      alert('Geçersiz e-posta adresi!');
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Bizimle İletişime Geçin 📞
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşabilirsiniz
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-bold text-gray-800 mb-2">E-posta</h3>
              <p className="text-gray-600">info@cocukdunyasi.com</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-gray-800 mb-2">Canlı Destek</h3>
              <p className="text-gray-600">7/24 size yardımcı olmaya hazırız</p>
            </div>
            <div className="bg-white rounded-2xl p-6">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-bold text-gray-800 mb-2">Sosyal Medya</h3>
              <p className="text-gray-600">Bizi takip edin ve güncel kalın</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;