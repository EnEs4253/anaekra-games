import React, { useEffect, useState } from 'react';

interface CelebrationProps {
  show: boolean;
  onComplete: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ show, onComplete }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; rotation: number; color: string }>>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'][Math.floor(Math.random() * 6)]
      }));
      
      setConfetti(particles);

      // Auto hide after animation
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Confetti particles */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animationDuration: `${1 + Math.random()}s`,
            animationDelay: `${Math.random() * 0.5}s`
          }}
        />
      ))}
      
      {/* Success message */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl text-center animate-bounce">
        <div className="text-6xl md:text-8xl mb-4">🎉</div>
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-2">
          Tebrikler!
        </h2>
        <p className="text-xl md:text-2xl text-purple-600 font-medium">
          Harikasın! 🌟
        </p>
      </div>
      
      {/* Animated emojis */}
      <div className="absolute top-1/4 left-1/4 text-4xl animate-bounce animation-delay-200">⭐</div>
      <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce animation-delay-400">🎊</div>
      <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce animation-delay-600">🎈</div>
      <div className="absolute bottom-1/4 right-1/3 text-4xl animate-bounce animation-delay-800">🏆</div>
    </div>
  );
};

export default Celebration;