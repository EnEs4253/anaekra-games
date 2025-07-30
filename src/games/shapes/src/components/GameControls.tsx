import React from 'react';
import { GameLevel } from '../types/game';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface GameControlsProps {
  currentLevel: GameLevel;
  onLevelChange: (level: GameLevel) => void;
  onRestart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  currentLevel,
  onLevelChange,
  onRestart,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
      {/* Level Selection */}
      <div className="flex gap-2">
        {[GameLevel.EASY, GameLevel.MEDIUM, GameLevel.HARD].map((level) => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={`
              px-4 py-2 rounded-xl font-medium transition-all duration-300
              ${currentLevel === level 
                ? 'bg-white text-purple-700 shadow-lg scale-105' 
                : 'bg-white/20 text-white hover:bg-white/30'
              }
            `}
          >
            {level === GameLevel.EASY && '⭐ Kolay'}
            {level === GameLevel.MEDIUM && '⭐⭐ Orta'}
            {level === GameLevel.HARD && '⭐⭐⭐ Zor'}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onRestart}
          className="
            p-3 rounded-xl bg-white/20 text-white hover:bg-white/30 
            transition-all duration-300 hover:scale-105
          "
          title="Yeniden Başla"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={onToggleSound}
          className="
            p-3 rounded-xl bg-white/20 text-white hover:bg-white/30 
            transition-all duration-300 hover:scale-105
          "
          title={soundEnabled ? "Sesi Kapat" : "Sesi Aç"}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default GameControls;