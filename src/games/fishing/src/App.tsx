import React, { useState } from 'react';
import Game from './components/Game';

function App() {
  const [gameStats, setGameStats] = useState({
    totalCaught: 0,
    highScore: 0,
    stars: 0
  });

  const updateStats = (stats: { score: number; caught: number }) => {
    setGameStats(prev => ({
      totalCaught: prev.totalCaught + stats.caught,
      highScore: Math.max(prev.highScore, stats.score),
      stars: prev.stars + Math.floor(stats.caught / 3)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-400 via-blue-500 to-blue-700">
      <Game onUpdateStats={updateStats} stats={gameStats} />
    </div>
  );
}

export default App;