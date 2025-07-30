import React from 'react';
import { Palette, Shapes, Puzzle, Zap, ArrowLeft } from 'lucide-react';

interface PlayPageProps {
  onNavigate: (page: string) => void;
}

const PlayPage: React.FC<PlayPageProps> = ({ onNavigate }) => {
  const games = [
    {
      id: 'coloring',
      title: 'Boyama Oyunu',
      emoji: '🎨',
      description: 'Renkli boyalarla hayal gücünü ortaya çıkar',
      color: 'from-red-400 to-pink-500',
      icon: Palette,
    },
    {
      id: 'shapes',
      title: 'Şekil Takma',
      emoji: '🔷',
      description: 'Şekilleri doğru yerlerine yerleştir',
      color: 'from-blue-400 to-purple-500',
      icon: Shapes,
    },
    {
      id: 'puzzle',
      title: 'Puzzle Oyunu',
      emoji: '🧩',
      description: 'Parçaları birleştirerek resmi tamamla',
      color: 'from-blue-400 to-cyan-500',
      icon: Puzzle,
    },
    {
      id: 'jumping',
      title: 'Zıpla! Oyunu',
      emoji: '🦘',
      description: 'Engelleri aşarak ilerle',
      color: 'from-green-400 to-yellow-500',
      icon: Zap,
    },
    {
      id: 'fishing',
      title: 'Balık Yakalama',
      emoji: '🐟',
      description: 'En çok balığı yakala, puanları topla!',
      color: 'from-cyan-400 to-blue-500',
      icon: Zap, // You can change this to a more suitable icon if available
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 py-12">
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
              Oyun Zamanı! 🎮
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Hangi oyunu oynamak istiyorsun? Her biri seni farklı bir maceraya götürecek!
            </p>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <div
                  key={game.id}
                  className="group cursor-pointer transform hover:scale-105 active:scale-95 transition-all duration-300"
                  onClick={() => {
                    if (game.id === 'fishing') {
                      onNavigate('fishing');
                    } else if (game.id === 'puzzle') {
                      onNavigate('puzzle');
                    } else if (game.id === 'shapes') {
                      onNavigate('shapes');
                    } else if (game.id === 'coloring') {
                      onNavigate('coloring');
                    } else if (game.id === 'jumping') {
                      onNavigate('jumping');
                    } else {
                      onNavigate(game.id);
                    }
                  }}
                >
                  <div className={`bg-gradient-to-br ${game.color} rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-white min-h-[250px] sm:min-h-[300px] flex flex-col justify-between`}>
                    <div className="text-center">
                      <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">{game.emoji}</div>
                      <Icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 group-hover:animate-bounce" />
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{game.title}</h3>
                      <p className="text-sm sm:text-lg opacity-90 mb-4 sm:mb-6 leading-relaxed">{game.description}</p>
                    </div>
                    <div>
                      <div className="bg-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-center group-hover:bg-white/30 transition-all duration-200">
                        <span className="text-sm sm:text-lg font-bold">Oyna! →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Daha Fazla Oyun Geliyor! 🚀
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Yakında daha fazla eğlenceli oyunla burada olacağız
          </p>
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
              <span className="text-2xl sm:text-4xl">🎯</span>
            </div>
            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
              <span className="text-2xl sm:text-4xl">🧩</span>
            </div>
            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
              <span className="text-2xl sm:text-4xl">🎪</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayPage;