import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  timeLimit: number | null;
  timeLimitStart: Date | null;
  isTimeLimitActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, timeLimit, timeLimitStart, isTimeLimitActive }) => {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait');
  const [remainingTime, setRemainingTime] = useState<string>('');

  // Kalan süreyi hesapla
  useEffect(() => {
    if (timeLimit && timeLimitStart && !isTimeLimitActive) {
      const calculateRemainingTime = () => {
        const now = new Date();
        const elapsed = (now.getTime() - timeLimitStart.getTime()) / (1000 * 60); // dakika cinsinden
        const remaining = Math.max(0, timeLimit - elapsed);
        
        if (remaining <= 0) {
          setRemainingTime('Süre doldu!');
        } else {
          const minutes = Math.floor(remaining);
          const seconds = Math.floor((remaining - minutes) * 60);
          setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      };

      calculateRemainingTime();
      const interval = setInterval(calculateRemainingTime, 1000);
      return () => clearInterval(interval);
    } else {
      setRemainingTime('');
    }
  }, [timeLimit, timeLimitStart, isTimeLimitActive]);

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
    // CSS class'ını body'ye ekle/çıkar
    document.body.classList.toggle('landscape-mode');
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-yellow-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🌟</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">ÇocukDünyası</h1>
          </div>

          {/* Time Remaining & Orientation Toggle */}
          <div className="flex items-center space-x-3">
            {/* Time Remaining */}
            {remainingTime && (
              <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-orange-100 border border-orange-200">
                <span className="text-orange-600">⏰</span>
                <span className="text-sm font-bold text-orange-700">
                  Güncelleme İçin: {remainingTime}
                </span>
              </div>
            )}
            {/* Orientation Toggle */}
            <button
              onClick={toggleOrientation}
              className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
              title={orientation === 'portrait' ? 'Yatay Görünüme Geç' : 'Dikey Görünüme Geç'}
            >
              {orientation === 'portrait' ? (
                <>
                  <span className="text-gray-600">📱</span>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">Yatay</span>
                </>
              ) : (
                <>
                  <span className="text-gray-600">📱</span>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">Dikey</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
    </header>
  );
};

export default Header;