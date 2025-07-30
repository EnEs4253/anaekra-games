import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Star, Trophy, Fish } from 'lucide-react';
import FishComponent from './Fish';

interface GameProps {
  onUpdateStats: (stats: { score: number; caught: number }) => void;
  stats: {
    totalCaught: number;
    highScore: number;
    stars: number;
  };
}

interface FishType {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  direction: { x: number; y: number };
  size: number;
}

const Game: React.FC<GameProps> = ({ onUpdateStats, stats }) => {
  const [fishes, setFishes] = useState<FishType[]>([]);
  const [score, setScore] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameLevel, setGameLevel] = useState(1);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const colors = ['text-orange-500', 'text-pink-500', 'text-yellow-500', 'text-green-500', 'text-purple-500', 'text-blue-500'];

  // Ses efektleri
  const playSound = (type: 'catch' | 'levelup' | 'start' | 'pause') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'catch') {
      // Daha yumuşak ve eğlenceli "pling" sesi
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5 notası
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.05); // E5 notası
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.08); // E5 notası
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.16); // G5 notası
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } else if (type === 'levelup') {
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(900, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.4);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.6);
    } else if (type === 'start') {
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    }
  };

  // Balık oluştur
  const createFish = useCallback(() => {
    const fish: FishType = {
      id: Math.random(),
      x: Math.random() * 75 + 10,
      y: Math.random() * 65 + 15,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 1.5 + gameLevel * 0.3,
      direction: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      },
      size: Math.random() * 25 + 35
    };
    return fish;
  }, [gameLevel]);

  // Oyunu başlat
  const startGame = () => {
    setIsGameActive(true);
    setGameStarted(true);
    playSound('start');
    
    // İlk balıkları oluştur
    const initialFishes = Array.from({ length: 3 }, () => createFish());
    setFishes(initialFishes);
  };


  // Oyunu yeniden başlat
  const resetGame = () => {
    if (gameStarted && (score > 0 || caughtCount > 0)) {
      onUpdateStats({ score, caught: caughtCount });
    }
    
    setFishes([]);
    setScore(0);
    setCaughtCount(0);
    setTimeLeft(30);
    setGameLevel(1);
    setIsGameActive(false);
    setGameStarted(false);
    setShowCelebration(false);
  };

  // Balık yakalama
  const catchFish = (fishId: number) => {
    if (!isGameActive) return;
    
    setFishes(prev => prev.filter(fish => fish.id !== fishId));
    setScore(prev => prev + 10 * gameLevel);
    setCaughtCount(prev => prev + 1);
    playSound('catch');
    
    // Kutlama efekti
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 500);

    // Seviye atlama kontrolü
    if ((caughtCount + 1) % 5 === 0) {
      setGameLevel(prev => prev + 1);
      playSound('levelup');
    }
  };

  // Balık hareketi
  useEffect(() => {
    if (!isGameActive) return;

    const moveInterval = setInterval(() => {
      setFishes(prev => prev.map(fish => {
        let newX = fish.x + fish.direction.x * fish.speed;
        let newY = fish.y + fish.direction.y * fish.speed;
        let newDirection = { ...fish.direction };

        // Sınırlardan sekme
        if (newX <= 0 || newX >= 95) {
          newDirection.x = -newDirection.x;
          newX = Math.max(0, Math.min(95, newX));
        }
        if (newY <= 5 || newY >= 85) {
          newDirection.y = -newDirection.y;
          newY = Math.max(5, Math.min(85, newY));
        }

        return {
          ...fish,
          x: newX,
          y: newY,
          direction: newDirection
        };
      }));
    }, 100);

    return () => clearInterval(moveInterval);
  }, [isGameActive]);

  // Balık ekleme
  useEffect(() => {
    if (!isGameActive) return;

    const spawnInterval = setInterval(() => {
      setFishes(prev => {
        if (prev.length < 3 + gameLevel) {
          return [...prev, createFish()];
        }
        return prev;
      });
    }, 2000 - gameLevel * 200);

    return () => clearInterval(spawnInterval);
  }, [createFish, gameLevel, isGameActive]);

  // Zamanlayıcı
  useEffect(() => {
    if (!isGameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsGameActive(false);
          onUpdateStats({ score, caught: caughtCount });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive, score, caughtCount, onUpdateStats]);

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Arka plan animasyonu */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white bg-opacity-10 animate-bounce"
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 4 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Başlık ve istatistikler */}
      <div className="relative z-10 text-center mb-4">
        <div className="bg-white bg-opacity-90 rounded-3xl p-6 shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Fish className="w-10 h-10 text-orange-500 animate-pulse" />
            <h1 className="text-4xl font-bold text-blue-800">Balıkları Yakala!</h1>
            <Fish className="w-10 h-10 text-pink-500 animate-pulse" />
          </div>
          
          {/* Genel istatistikler */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-yellow-100 rounded-xl p-3">
              <Trophy className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
              <div className="text-sm text-yellow-800">En Yüksek</div>
              <div className="font-bold text-yellow-900">{stats.highScore}</div>
            </div>
            <div className="bg-green-100 rounded-xl p-3">
              <Fish className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm text-green-800">Toplam</div>
              <div className="font-bold text-green-900">{stats.totalCaught}</div>
            </div>
            <div className="bg-purple-100 rounded-xl p-3">
              <Star className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              <div className="text-sm text-purple-800">Yıldız</div>
              <div className="font-bold text-purple-900">{stats.stars}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Oyun kontrolleri */}
      <div className="relative z-10 flex justify-center gap-4 mb-4">
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 
                     text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-300 
                     transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Play className="w-8 h-8" />
            Oyunu Başlat!
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 
                     text-white font-bold py-3 px-6 rounded-xl text-lg transition-all duration-300 
                     transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <RotateCcw className="w-6 h-6" />
            Yeniden Başla
          </button>
        )}
      </div>

      {/* Oyun durumu */}
      {gameStarted && (
        <div className="relative z-10 flex justify-center gap-4 mb-4">
          <div className="flex gap-4 bg-white bg-opacity-90 rounded-2xl p-4">
            <div className="bg-blue-100 px-4 py-2 rounded-xl text-center">
              <div className="text-sm text-blue-600">Puan</div>
              <div className="font-bold text-blue-800 text-xl">{score}</div>
            </div>
            <div className="bg-green-100 px-4 py-2 rounded-xl text-center">
              <div className="text-sm text-green-600">Yakalanan</div>
              <div className="font-bold text-green-800 text-xl">{caughtCount}</div>
            </div>
            <div className="bg-orange-100 px-4 py-2 rounded-xl text-center">
              <div className="text-sm text-orange-600">Süre</div>
              <div className="font-bold text-orange-800 text-xl">{timeLeft}s</div>
            </div>
            <div className="bg-purple-100 px-4 py-2 rounded-xl text-center">
              <div className="text-sm text-purple-600">Seviye</div>
              <div className="font-bold text-purple-800 text-xl">{gameLevel}</div>
            </div>
          </div>
        </div>
      )}

      {/* Oyun alanı */}
      <div className="relative bg-gradient-to-b from-cyan-300 to-blue-600 rounded-3xl h-96 md:h-[500px] overflow-hidden border-4 border-white shadow-2xl mx-auto max-w-6xl">
        {/* Balıklar */}
        {fishes.map(fish => (
          <FishComponent
            key={fish.id}
            fish={fish}
            onCatch={() => catchFish(fish.id)}
            isGameActive={isGameActive}
          />
        ))}


        {/* Oyun bitti ekranı */}
        {!isGameActive && timeLeft === 0 && gameStarted && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 text-center max-w-sm">
              <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Oyun Bitti!</h2>
              <p className="text-lg text-gray-600 mb-4">
                {caughtCount >= 15 ? "Harikasın! 🌟" : 
                 caughtCount >= 10 ? "Çok iyi! 👏" :
                 caughtCount >= 5 ? "İyi oyun! 👍" : "Tekrar dene! 💪"}
              </p>
              <div className="mb-6">
                <div className="text-2xl font-bold text-blue-600">Puan: {score}</div>
                <div className="text-lg text-green-600">Yakalanan: {caughtCount} balık</div>
                <div className="text-lg text-purple-600">Kazanılan yıldız: {Math.floor(caughtCount / 3)}</div>
              </div>
              <button
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Tekrar Oyna
              </button>
            </div>
          </div>
        )}

        {/* Başlangıç mesajı */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 text-center max-w-md">
              <Fish className="w-20 h-20 text-orange-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Hazır mısın?</h2>
              <p className="text-lg text-gray-600 mb-4">
                Balıkları yakalamak için üzerlerine dokun! 🐟
              </p>
              <p className="text-sm text-gray-500">
                Yukarıdaki "Oyunu Başlat" butonuna bas!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Kutlama efekti */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-ping">🌟</div>
        </div>
      )}
    </div>
  );
};

export default Game;