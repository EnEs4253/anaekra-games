import React, { useEffect, useRef } from 'react';
import './styles.css';
import './index.css';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    import('./game.js').then((module) => {
      new module.default();
    });
  }, []);

  return (
    <div id="gameContainer">
      {/* Menu Screen */}
      <div id="menuScreen" className="screen active">
        <div className="title">
          <h1>🐰 Zıpla! Oyunu</h1>
          <p>3-7 yaş çocuklar için eğitici oyun</p>
        </div>
        <div className="character-selection">
          <h3>Karakterini Seç:</h3>
          <div className="characters">
            <button className="character-btn active" data-character="rabbit">🐰 Tavşan</button>
            <button className="character-btn" data-character="cat">🐱 Kedi</button>
            <button className="character-btn" data-character="panda">🐼 Panda</button>
          </div>
        </div>
        <button id="playBtn" className="play-btn">Oyna!</button>
        <button id="soundToggle" className="sound-btn">🔊</button>
      </div>

      {/* Game Screen */}
      <div id="gameScreen" className="screen">
        <div className="game-ui">
          <div className="score-panel">
            <div className="counter">
              <span className="icon">🏃</span>
              <span>Koşuyor!</span>
            </div>
          </div>
        </div>
        <canvas id="gameCanvas" ref={canvasRef}></canvas>
        <div className="jump-instruction">
          <p id="jumpText">Zıplamak için ekrana dokun!</p>
        </div>
      </div>

      {/* Game Over Screen */}
      <div id="gameOverScreen" className="screen">
        <div className="results">
          <h2>Tebrikler! 🎉</h2>
          <div className="achievements">
            <div className="achievement">
              <span className="icon">🏆</span>
              <span>Oyun bitti!</span>
            </div>
            <div className="achievement">
              <span className="icon">🏃</span>
              <span>Koşmaya devam et!</span>
            </div>
            <div className="achievement">
              <span className="icon">💪</span>
              <span>Tekrar dene!</span>
            </div>
          </div>
          <button id="playAgainBtn" className="play-btn">Tekrar Oyna!</button>
        </div>
      </div>
    </div>
  );
}

export default App;
