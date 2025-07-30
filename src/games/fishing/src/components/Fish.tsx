import React from 'react';

interface FishProps {
  fish: {
    id: number;
    x: number;
    y: number;
    color: string;
    speed: number;
    direction: { x: number; y: number };
    size: number;
  };
  onCatch: () => void;
  isGameActive: boolean;
}

const FishComponent: React.FC<FishProps> = ({ fish, onCatch, isGameActive }) => {
  const handleClick = () => {
    if (isGameActive) {
      onCatch();
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transform transition-all duration-300 hover:scale-110 ${fish.color}`}
      style={{
        left: `${fish.x}%`,
        top: `${fish.y}%`,
        fontSize: `${fish.size}px`,
        animation: `swim-${fish.id % 3} 3s ease-in-out infinite, float-${fish.id % 2} 2s ease-in-out infinite`
      }}
      onClick={handleClick}
    >
      {/* Balık gövdesi */}
      <div className="relative inline-block animate-pulse">
        {/* Ana balık şekli */}
        <div className="relative">
          🐟
          
          {/* Parıltı efekti */}
          <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent rounded-full animate-ping opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          {/* Kabarcıklar */}
          <div className="absolute -top-2 -left-1">
            <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          </div>
          <div className="absolute -top-3 left-1">
            <div className="w-0.5 h-0.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          <div className="absolute -top-4 left-3">
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishComponent;