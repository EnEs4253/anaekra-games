import React from 'react';
import { Palette, Volume2, Shapes, ArrowLeft, BookOpen } from 'lucide-react';

interface LearnPageProps {
  onNavigate: (page: string) => void;
}

const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
  const learningAreas = [
    {
      id: 'alphabet',
      title: 'Alfabe',
      emoji: '🔤',
      description: 'Harfleri öğren ve okumaya başla',
      color: 'from-orange-400 to-yellow-500',
      icon: BookOpen,
    },
    {
      id: 'colors',
      title: 'Renkler',
      emoji: '🌈',
      description: 'Renkleri öğren ve tanı',
      color: 'from-red-400 via-yellow-400 to-blue-500',
      icon: Palette,
    },
    {
      id: 'animals',
      title: 'Hayvan Sesleri',
      emoji: '🐾',
      description: 'Hayvanları ve seslerini keşfet',
      color: 'from-green-400 to-emerald-500',
      icon: Volume2,
    },
    {
      id: 'shapes',
      title: 'Şekiller',
      emoji: '⭐',
      description: 'Geometrik şekilleri öğren',
      color: 'from-purple-400 to-indigo-500',
      icon: Shapes,
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 py-12">
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
              Eğlen ve Öğren! 🧠
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Oyunlarla öğrenmenin keyfini çıkar! Her konu seni yeni şeyler keşfetmeye götürecek.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Areas */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {learningAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.id}
                  className="group cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${area.color} rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-white min-h-[280px] sm:min-h-[320px] flex flex-col justify-between`}>
                    <div className="text-center">
                      <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">{area.emoji}</div>
                      <Icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 group-hover:animate-bounce" />
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{area.title}</h3>
                      <p className="text-sm sm:text-lg opacity-90 mb-6 sm:mb-8 leading-relaxed">{area.description}</p>
                    </div>
                    <div>
                      <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-center group-hover:bg-white/30 transition-all duration-200">
                        <span className="text-sm sm:text-lg font-bold">Öğrenmeye Başla! →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Benefits */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Neler Öğreneceksin? 📚
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl sm:text-3xl">🎨</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Yaratıcılık</h3>
              <p className="text-sm sm:text-base text-gray-600">Hayal gücünü geliştir ve yaratıcı düşünmeyi öğren</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl sm:text-3xl">🧩</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Problem Çözme</h3>
              <p className="text-sm sm:text-base text-gray-600">Mantık yürütme ve problem çözme becerilerini geliştir</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl sm:text-3xl">🌟</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Keşfetme</h3>
              <p className="text-sm sm:text-base text-gray-600">Yeni şeyler keşfetme ve merak etme yeteneğini artır</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnPage;