import React, { useState, useEffect } from 'react';
import { Shuffle, Star, Heart, Sparkles, Tablet, Smartphone } from 'lucide-react';

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  image: string;
}

const PUZZLE_IMAGES = [
  {
    image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Kedi',
    sound: 'miyav'
  },
  {
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Köpek',
    sound: 'hav hav'
  },
  {
    image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'İnek',
    sound: 'möö'
  },
  {
    image: 'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Kuş',
    sound: 'cik cik'
  },
  {
    image: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'At',
    sound: 'kişne'
  },
  {
    image: 'https://images.pexels.com/photos/302478/pexels-photo-302478.jpeg?auto=compress&cs=tinysrgb&w=400&v=3',
    name: 'Arı',
    sound: 'vızz vızz'
  },
  {
    image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Aslan',
    sound: 'roar'
  },
  {
    image: 'https://images.pexels.com/photos/66898/elephant-cub-tsavo-kenya-66898.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Fil',
    sound: 'trumpeting'
  },
  {
    image: 'https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg?auto=compress&cs=tinysrgb&w=400',
    name: 'Lemur',
    sound: 'eek eek'
  }
];

function App() {
  const [gridSize, setGridSize] = useState(3);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  // Orientation toggle state
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  // Orientation toggle fonksiyonu
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
    document.body.classList.toggle('landscape-mode');
  };

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && !isComplete) {
      interval = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  // Initialize puzzle
  const initializePuzzle = () => {
    const totalPieces = gridSize * gridSize;
    const newPieces: PuzzlePiece[] = [];
    
    for (let i = 0; i < totalPieces; i++) {
      newPieces.push({
        id: i,
        currentPosition: i,
        correctPosition: i,
        image: PUZZLE_IMAGES[currentImage].image
      });
    }
    
    // Shuffle pieces
    const shuffled = [...newPieces];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].currentPosition;
      shuffled[i].currentPosition = shuffled[j].currentPosition;
      shuffled[j].currentPosition = temp;
    }
    
    setPieces(shuffled);
    setIsComplete(false);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setShowCelebration(false);
  };

  // Check if puzzle is complete
  const checkComplete = (currentPieces: PuzzlePiece[]) => {
    const complete = currentPieces.every(piece => piece.currentPosition === piece.correctPosition);
    if (complete && !isComplete) {
      setIsComplete(true);
      setIsPlaying(false);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Handle piece click
  const handlePieceClick = (position: number) => {
    const clickedPiece = pieces.find(p => p.currentPosition === position);
    if (!clickedPiece) return;

    if (selectedPiece === null) {
      // İlk parça seçiliyor
      setSelectedPiece(clickedPiece.id);
    } else if (selectedPiece === clickedPiece.id) {
      // Aynı parçaya tekrar tıklandı, seçimi kaldır
      setSelectedPiece(null);
    } else {
      // İki parçayı yer değiştir
      const newPieces = [...pieces];
      const selectedIndex = newPieces.findIndex(p => p.id === selectedPiece);
      const clickedIndex = newPieces.findIndex(p => p.id === clickedPiece.id);

      if (selectedIndex !== -1 && clickedIndex !== -1) {
        // Pozisyonları değiştir
        const temp = newPieces[selectedIndex].currentPosition;
        newPieces[selectedIndex].currentPosition = newPieces[clickedIndex].currentPosition;
        newPieces[clickedIndex].currentPosition = temp;
        
        setPieces(newPieces);
        setMoves(prev => prev + 1);
        checkComplete(newPieces);
      }
      
      setSelectedPiece(null);
    }
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get piece style
  const getPieceStyle = (piece: PuzzlePiece) => {
    const row = Math.floor(piece.correctPosition / gridSize);
    const col = piece.correctPosition % gridSize;
    const pieceSize = 300 / gridSize;
    
    return {
      backgroundImage: `url(${piece.image})`,
      backgroundSize: '300px 300px',
      backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
      width: `${pieceSize}px`,
      height: `${pieceSize}px`,
    };
  };

  // Initialize on first load
  useEffect(() => {
    initializePuzzle();
  }, [gridSize, currentImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header - Design System Reference'a uygun */}
      <header className="bg-white shadow-lg border-b-4 border-yellow-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer select-none">
              <div className="logo-container">
                <span className="text-white font-bold text-xl">🌟</span>
              </div>
              <h1 className="logo-text">ÇocukDünyası</h1>
            </div>
            
            {/* Orientation Toggle - Sağ üstte */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleOrientation}
                className="orientation-btn"
                title={orientation === 'portrait' ? 'Yatay Görünüme Geç' : 'Dikey Görünüme Geç'}
              >
                {orientation === 'portrait' ? (
                  <>
                    <Tablet className="w-5 h-5 text-gray-600" />
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">Yatay</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">Dikey</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto p-4">
        {/* Game Controls - Design System Reference'a uygun */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-4">
            {/* Difficulty Buttons */}
            <div className="flex gap-2">
              {[3, 4, 5].map(size => (
                <button
                  key={size}
                  onClick={() => setGridSize(size)}
                  className={`btn-primary btn-md ${
                    gridSize === size 
                      ? 'from-yellow-400 to-orange-500' 
                      : 'from-white to-gray-200 text-purple-600 border border-purple-200'
                  } bg-gradient-to-r`}
                >
                  {size}x{size}
                </button>
              ))}
            </div>

            {/* Image Selection */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 justify-center max-w-sm sm:max-w-none">
              {PUZZLE_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                    currentImage === index ? 'ring-4 ring-yellow-400 shadow-lg' : 'ring-2 ring-white/50'
                  }`}
                >
                  <img src={img.image} alt={`Puzzle ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Control Buttons */}
            <button
              onClick={initializePuzzle}
              className="btn-primary btn-md from-green-400 to-blue-500 bg-gradient-to-r flex items-center gap-2"
            >
              <Shuffle size={16} className="sm:w-5 sm:h-5" />
              YENİ OYUN
            </button>
          </div>

          {/* Stats - Design System Reference'a uygun */}
          <div className="flex justify-center gap-4 sm:gap-8 text-white font-bold text-sm sm:text-lg">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-2 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 text-blue-900">
              <Star size={16} className="sm:w-5 sm:h-5" />
              Hamle: {moves}
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-3 py-2 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 text-purple-900">
              <Heart size={16} className="sm:w-5 sm:h-5" />
              Süre: {formatTime(time)}
            </div>
          </div>
        </div>

        {/* Game Area - Orientation'a göre düzenleme */}
        <div className={`flex ${orientation === 'landscape' ? 'flex-row' : 'flex-col'} items-center justify-center gap-6 sm:gap-8`}>
          {/* Reference Image */}
          <div className={`card-base card-gradient from-pink-200 via-purple-200 to-blue-200 ${orientation === 'landscape' ? 'w-1/2' : 'w-full'} max-w-md p-4 sm:p-6`}>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center">🎯 Hedef Resim</h3>
            <img 
              src={PUZZLE_IMAGES[currentImage].image} 
              alt="Target" 
              className="w-full max-w-64 h-64 object-cover rounded-2xl shadow-lg mx-auto"
            />
          </div>

          {/* Puzzle Grid */}
          <div className={`card-base card-gradient from-green-200 via-blue-200 to-purple-200 ${orientation === 'landscape' ? 'w-1/2' : 'w-full'} max-w-md p-4 sm:p-6`}>
            <h3 className="text-white text-lg sm:text-xl font-bold mb-2 text-center">🧩 Puzzle</h3>
            <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 text-center">
              {selectedPiece ? '✨ İkinci parçayı seç' : '👆 Bir parçaya tıkla'}
            </p>
            <div 
              className="bg-white/30 p-2 sm:p-4 rounded-2xl shadow-inner mx-auto flex items-center justify-center"
              style={{ 
                width: orientation === 'landscape' 
                  ? 'min(400px, calc(50vw - 20px))' 
                  : 'min(350px, calc(100vw - 80px))',
                height: orientation === 'landscape' 
                  ? 'min(400px, calc(50vw - 20px))' 
                  : 'min(350px, calc(100vw - 80px))'
              }}
            >
              <div 
                className="grid gap-1 sm:gap-2"
                style={{ 
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  width: '100%',
                  height: '100%'
                }}
              >
                {Array.from({ length: gridSize * gridSize }, (_, index) => {
                  const piece = pieces.find(p => p.currentPosition === index);
                  const isSelected = piece && selectedPiece === piece.id;
                  return (
                    <div
                      key={index}
                      className={`bg-white/50 flex items-center justify-center relative cursor-pointer group rounded-lg transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-yellow-400 shadow-lg scale-105' : 'hover:scale-105'
                      }`}
                      onClick={() => handlePieceClick(index)}
                    >
                      {piece && (
                        <div
                          className={`w-full h-full transition-all duration-300 rounded-lg ${
                            isSelected ? 'brightness-110' : ''
                          }`}
                          style={getPieceStyle(piece)}
                        />
                      )}
                      {isSelected && (
                        <div className="absolute inset-0 bg-yellow-400/30 rounded-lg flex items-center justify-center">
                          <Sparkles className="text-yellow-600 animate-pulse w-4 h-4 sm:w-6 sm:h-6" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Completion Modal */}
        {isComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl transform animate-bounce mx-4 max-w-sm">
              <div className="text-4xl sm:text-6xl mb-4">🎉</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-4">TEBRİKLER!</h2>
              <p className="text-sm sm:text-lg text-gray-600 mb-4">
                Puzzle'ı {moves} hamlede ve {formatTime(time)} sürede tamamladın!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={initializePuzzle}
                  className="btn-primary btn-md from-purple-400 to-pink-500 bg-gradient-to-r"
                >
                  YENİ OYUN
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-40">
            <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce">🎊</div>
            <div className="absolute top-1/3 right-1/4 text-4xl animate-pulse">✨</div>
            <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce">🌟</div>
            <div className="absolute bottom-1/4 right-1/3 text-4xl animate-pulse">🎉</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;