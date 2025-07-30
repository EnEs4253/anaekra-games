import React from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const categories = [
    {
      id: 'learn',
      title: 'Eğlen-Öğren',
      emoji: '🧠',
      description: 'Oyunlarla öğrenmenin keyfini çıkar',
      color: 'from-purple-400 to-pink-500',
      icon: '📚',
    },
    {
      id: 'play',
      title: 'Oyna',
      emoji: '🎮',
      description: 'Eğlenceli oyunlarla dolu maceralar',
      color: 'from-green-400 to-blue-500',
      icon: '🎮',
    },
    {
      id: 'quiz',
      title: 'Bil Bakalım',
      emoji: '❓',
      description: 'Testlerle bilginizi ölçün',
      color: 'from-yellow-400 to-pink-500',
      icon: '⭐',
    },
    {
      id: 'about',
      title: 'Hakkımızda',
      emoji: '👨‍👩‍👧',
      description: 'Bizimle tanışın ve daha fazla bilgi alın',
      color: 'from-pink-400 to-purple-500',
      icon: 'ℹ️',
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-12 sm:py-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 animate-bounce">
            <span className="text-yellow-400 text-2xl">⭐</span>
          </div>
          <div className="absolute top-20 right-16 animate-pulse">
            <span className="text-pink-400 text-xl">💖</span>
          </div>
          <div className="absolute bottom-16 left-1/4 animate-bounce delay-300">
            <span className="text-blue-400 text-xl">⭐</span>
          </div>
          <div className="absolute bottom-20 right-10 animate-pulse delay-500">
            <span className="text-purple-400 text-2xl">💖</span>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
            Hoş Geldin!
            <span className="block text-3xl sm:text-4xl text-purple-600 mt-2">
              Eğlencenin Dünyasına 🌈
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Oyunlar, öğrenme ve keşiflerle dolu harika bir dünyada maceraya hazır mısın?
          </p>
          
          {/* Fun Interactive Section */}
          <div className="relative mb-12">
            {/* Rainbow Bridge */}
            <div className="flex justify-center items-center mb-8">
              <div className="bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-purple-400 to-pink-400 h-4 w-64 sm:w-96 rounded-full shadow-lg"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="flex justify-center items-center space-x-8 sm:space-x-12 mb-8">
              <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full p-4 sm:p-6 shadow-xl transform hover:scale-110 transition-transform duration-300">
                <span className="text-4xl sm:text-6xl">🌟</span>
              </div>
              <div className="bg-gradient-to-br from-pink-300 to-purple-400 rounded-full p-4 sm:p-6 shadow-xl transform hover:scale-110 transition-transform duration-300">
                <span className="text-4xl sm:text-6xl">🎈</span>
              </div>
              <div className="bg-gradient-to-br from-blue-300 to-cyan-400 rounded-full p-4 sm:p-6 shadow-xl transform hover:scale-110 transition-transform duration-300">
                <span className="text-4xl sm:text-6xl">🎪</span>
              </div>
            </div>
            
            {/* Welcome Message Box */}
            <div className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white">
              <div className="text-center">
                <div className="flex justify-center space-x-4 mb-4">
                  <span className="text-3xl sm:text-4xl animate-bounce">🎨</span>
                  <span className="text-3xl sm:text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🎵</span>
                  <span className="text-3xl sm:text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>🎮</span>
                  <span className="text-3xl sm:text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🧩</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Maceraya Hazır mısın? 🚀
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Aşağıdaki kutulara tıklayarak eğlenceli dünyalara adım at!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Neler Yapabilirsin?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => {
              return (
                <div
                  key={category.id}
                  onClick={() => onNavigate(category.id)}
                  className="group cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${category.color} rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-white min-h-[180px] sm:min-h-[220px] flex flex-col justify-between`}>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 animate-pulse">{category.emoji}</div>
                      <div className="text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4 group-hover:animate-bounce">{category.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">{category.title}</h3>
                      <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{category.description}</p>
                    </div>
                    <div className="mt-4 sm:mt-6">
                      <div className="bg-white/20 rounded-full px-3 sm:px-4 py-2 text-center">
                        <span className="text-xs sm:text-sm font-medium">Keşfet →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Eğlenceli Sayılar! 📊
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">4</div>
              <div className="text-xs sm:text-sm text-blue-700 font-medium">Oyun Kategorisi</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">3</div>
              <div className="text-xs sm:text-sm text-green-700 font-medium">Öğrenme Alanı</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">∞</div>
              <div className="text-xs sm:text-sm text-purple-700 font-medium">Eğlence</div>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold text-pink-600">100%</div>
              <div className="text-xs sm:text-sm text-pink-700 font-medium">Güvenli</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;