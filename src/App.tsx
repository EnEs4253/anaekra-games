import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PlayPage from './pages/PlayPage';
import LearnPage from './pages/LearnPage';
import AboutPage from './pages/AboutPage';
import ParentPanel from './pages/ParentPanel';
import QuizPage from './pages/QuizPage';
import ColoringGamePage from './pages/ColoringGamePage';
import ShapesGamePage from './pages/ShapesGamePage';
import PuzzleGamePage from './pages/PuzzleGamePage';
import JumpingGamePage from './pages/JumpingGamePage';
import FishingGamePage from './pages/FishingGamePage';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-pink-400">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg font-semibold">Yükleniyor...</p>
    </div>
  </div>
);

// Ana App component'i Router içinde çalışacak
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1);
  
  // Navigation function - React Router ile uyumlu
  const handleNavigate = (page: string) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [timeLimitStart, setTimeLimitStart] = useState<Date | null>(null);
  const [isTimeLimitActive, setIsTimeLimitActive] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState('');
  const [showUnlockForm, setShowUnlockForm] = useState(false);

  // Sayfa yüklendiğinde localStorage'dan süre sınırı durumunu kontrol et
  useEffect(() => {
    const savedTimeLimit = localStorage.getItem('timeLimit');
    const savedTimeLimitStart = localStorage.getItem('timeLimitStart');
    const savedIsTimeLimitActive = localStorage.getItem('isTimeLimitActive');

    if (savedTimeLimit && savedTimeLimitStart && savedIsTimeLimitActive === 'true') {
      setTimeLimit(parseInt(savedTimeLimit));
      setTimeLimitStart(new Date(savedTimeLimitStart));
      setIsTimeLimitActive(true);
    }
  }, []);

  // Süre sınırı kontrolü
  useEffect(() => {
    if (timeLimit && timeLimitStart && !isTimeLimitActive) {
      const checkTimeLimit = () => {
        const now = new Date();
        const elapsed = (now.getTime() - timeLimitStart.getTime()) / (1000 * 60); // dakika cinsinden
        
        if (elapsed >= timeLimit) {
          setIsTimeLimitActive(true);
          // localStorage'ı güncelle
          localStorage.setItem('isTimeLimitActive', 'true');
        }
      };

      const interval = setInterval(checkTimeLimit, 1000); // Her saniye kontrol
      return () => clearInterval(interval);
    }
  }, [timeLimit, timeLimitStart, isTimeLimitActive]);

  // Süre sınırı aktif olduğunda gösterilecek ekran
  if (isTimeLimitActive) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white p-8 max-w-md">
          <div className="text-8xl mb-8">🔧</div>
          <h1 className="text-4xl font-bold mb-4">Uygulama Şuan Bakımda</h1>
          <p className="text-xl mb-8">Teknik işlemler devam ediyor, lütfen bekleyiniz.</p>
          
          {!showUnlockForm ? (
            <button
              onClick={() => setShowUnlockForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              İletişim
            </button>
          ) : (
            <div className="bg-white rounded-2xl p-6 text-black">
              <h3 className="text-xl font-bold mb-4">Teknik Destek</h3>
              <input
                type="text"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                placeholder="E-posta adresinizi girin"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowUnlockForm(false);
                    setUnlockPassword('');
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    if (unlockPassword === 'ebeveyn123') {
                      setIsTimeLimitActive(false);
                      setTimeLimit(null);
                      setTimeLimitStart(null);
                      setUnlockPassword('');
                      setShowUnlockForm(false);
                      
                      // localStorage'ı temizle
                      localStorage.removeItem('timeLimit');
                      localStorage.removeItem('timeLimitStart');
                      localStorage.removeItem('isTimeLimitActive');
                      
                      alert('Bakım tamamlandı! Uygulama tekrar kullanılabilir.');
                    } else {
                      alert('Geçersiz e-posta adresi!');
                    }
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Gönder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Sadece genel sayfalarda header göster */}
      {['home', 'play', 'learn', 'parent', 'about', 'quiz'].includes(currentPage) && (
        <Header 
          timeLimit={timeLimit}
          timeLimitStart={timeLimitStart}
          isTimeLimitActive={isTimeLimitActive}
        />
      )}
      <main className="transition-all duration-500 ease-in-out">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/play" element={<PlayPage onNavigate={handleNavigate} />} />
          <Route path="/learn" element={<LearnPage onNavigate={handleNavigate} />} />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigate} />} />
          <Route path="/parent" element={
            <ParentPanel 
              onNavigate={handleNavigate}
              timeLimit={timeLimit}
              setTimeLimit={setTimeLimit}
              setTimeLimitStart={setTimeLimitStart}
              setIsTimeLimitActive={setIsTimeLimitActive}
            />
          } />
          <Route path="/quiz" element={<QuizPage onNavigate={handleNavigate} />} />
          <Route path="/coloring" element={<ColoringGamePage onNavigate={handleNavigate} />} />
          <Route path="/shapes" element={<ShapesGamePage onNavigate={handleNavigate} />} />
          <Route path="/puzzle" element={<PuzzleGamePage onNavigate={handleNavigate} />} />
          <Route path="/jumping" element={<JumpingGamePage onNavigate={handleNavigate} />} />
          <Route path="/fishing" element={<FishingGamePage onNavigate={handleNavigate} />} />
        </Routes>
      </main>
    </div>
  );
}

// Ana App component'i - Router wrapper'ı
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;