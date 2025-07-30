import React, { useState, useEffect } from 'react';
import { Shield, Clock, Settings, ArrowLeft, Lock } from 'lucide-react';

interface ParentPanelProps {
  onNavigate: (page: string) => void;
  timeLimit: number | null;
  setTimeLimit: (limit: number | null) => void;
  setTimeLimitStart: (date: Date | null) => void;
  setIsTimeLimitActive: (active: boolean) => void;
  autoLogin?: boolean;
}

const ParentPanel: React.FC<ParentPanelProps> = ({ 
  onNavigate, 
  timeLimit, 
  setTimeLimit, 
  setTimeLimitStart, 
  setIsTimeLimitActive,
  autoLogin = false
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showTimeSettings, setShowTimeSettings] = useState(false);
  const [dailyTimeLimit, setDailyTimeLimit] = useState(30);
  const [breakTime, setBreakTime] = useState(15);

  // AboutPage'den geldiğinde otomatik giriş yap
  useEffect(() => {
    if (autoLogin) {
      setIsAuthenticated(true);
    }
  }, [autoLogin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basit demo amaçlı şifre kontrolü
    if (password === 'ebeveyn123') {
      setIsAuthenticated(true);
    } else {
      alert('Yanlış şifre! Demo için: ebeveyn123');
    }
  };

  const features = [
    {
      id: 'time',
      title: 'Süre Ayarı',
      emoji: '⏰',
      description: 'Günlük kullanım süresini belirleyin',
      color: 'from-green-400 to-green-600',
      icon: Clock,
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pb-20 md:pb-8 bg-gradient-to-br from-orange-100 to-red-100">
        <section className="py-12">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft size={24} />
                <span className="font-medium">Ana Sayfa</span>
              </button>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10 text-orange-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Ebeveyn Paneli 🔒
                </h1>
                <p className="text-gray-600">
                  Bu alan sadece ebeveynler için tasarlanmıştır
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Ebeveyn Şifresi
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Şifrenizi giriniz"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Giriş Yap
                </button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Demo Şifresi:</strong> ebeveyn123
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-200 via-red-200 to-pink-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
              <span className="font-medium">Ana Sayfa</span>
            </button>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                onNavigate('home');
              }}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              <Shield size={20} />
              <span className="font-medium">Çıkış</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Ebeveyn Paneli 🔒
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Çocuğunuzun dijital deneyimini güvenli ve eğitici hale getirin
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  onClick={() => setShowTimeSettings(true)}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${feature.color} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-white h-full`}>
                    <div className="text-center">
                      <div className="text-6xl mb-6">{feature.emoji}</div>
                      <Icon className="w-12 h-12 mx-auto mb-6 group-hover:animate-bounce" />
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-lg opacity-90 mb-8">{feature.description}</p>
                      <div className="bg-white/20 rounded-full px-6 py-3 text-center group-hover:bg-white/30 transition-all duration-200">
                        <span className="text-lg font-bold">Ayarla →</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Time Settings Modal */}
      {showTimeSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-green-600" />
                Süre Ayarı ⏰
              </h2>
              <button
                onClick={() => setShowTimeSettings(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Current Time Limit Display */}
              {timeLimit && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">Aktif Süre Sınırı:</span>
                    <span className="text-lg font-bold text-green-600">{timeLimit} dakika</span>
                  </div>
                </div>
              )}

              {/* Time Limit Setting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Kullanım Süresi (Dakika)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="5"
                    max="120"
                    step="5"
                    value={dailyTimeLimit}
                    onChange={(e) => setDailyTimeLimit(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-lg font-bold text-green-600 min-w-[60px]">
                    {dailyTimeLimit} dk
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>5 dk</span>
                  <span>120 dk</span>
                </div>
              </div>

              {/* Parent Password for Unlock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Ebeveyn Şifresi (Süre Sınırını Kaldırmak İçin)
                </label>
                <input
                  type="password"
                  placeholder="Ebeveyn şifresini girin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowTimeSettings(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    setTimeLimit(dailyTimeLimit);
                    setTimeLimitStart(new Date());
                    setIsTimeLimitActive(false);
                    
                    // localStorage'a kaydet
                    localStorage.setItem('timeLimit', dailyTimeLimit.toString());
                    localStorage.setItem('timeLimitStart', new Date().toISOString());
                    localStorage.setItem('isTimeLimitActive', 'false');
                    
                    alert(`Süre sınırı ayarlandı: ${dailyTimeLimit} dakika\nSüre başlatıldı!`);
                    setShowTimeSettings(false);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Süreyi Başlat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Günlük Özet 📈
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">25</div>
              <div className="text-sm text-blue-700 font-medium">Dakika Oynadı</div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-sm text-green-700 font-medium">Yeni Kelime</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">2</div>
              <div className="text-sm text-purple-700 font-medium">Tamamlanan Oyun</div>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-pink-600">100%</div>
              <div className="text-sm text-pink-700 font-medium">Güvenli Zaman</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentPanel;