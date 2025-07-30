import React from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import GameShape from './components/GameShape';
import ShapeSlot from './components/ShapeSlot';
import GameControls from './components/GameControls';
import Celebration from './components/Celebration';
import FeedbackMessage from './components/FeedbackMessage';

function App() {
  const {
    gameState,
    draggedShapeId,
    dragOverSlotId,
    soundEnabled,
    feedback,
    startNewGame,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleCelebrationComplete,
    toggleSound,
    handleShapeClick
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-4 overflow-hidden">
      {/* Game Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
          🧩 Şekil Takma Oyunu
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium">
          Şekilleri doğru yerlerine sürükle!
        </p>
      </div>

      {/* Game Controls */}
      <GameControls
        currentLevel={gameState.level}
        onLevelChange={startNewGame}
        onRestart={() => startNewGame(gameState.level)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      {/* Game Area */}
      <div className="max-w-6xl mx-auto">
        {/* Shape Slots (Top) */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Şekillerin Yerleri ⬇️
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {gameState.slots.map((slot) => (
              <div 
                key={slot.id}
                data-slot-id={slot.id}
              >
                <ShapeSlot
                  slot={slot}
                  onDrop={handleDrop}
                  onDragOver={(e) => handleDragOver(e, slot.id)}
                  isDragOver={dragOverSlotId === slot.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Game Shapes (Bottom) */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Şekilleri Sürükle ⬆️
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {gameState.shapes.map((shape) => (
              <GameShape
                key={shape.id}
                shape={shape}
                onDragStart={handleDragStart}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                isDragging={draggedShapeId === shape.id}
                showSuccess={shape.isCorrect}
                showError={false}
                onShapeClick={handleShapeClick}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="font-bold text-purple-700">İlerleme:</span>
            <div className="flex gap-1">
              {Array.from({ length: gameState.level }, (_, i) => (
                <div
                  key={i}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${i < gameState.completedShapes 
                      ? 'bg-green-500 scale-125' 
                      : 'bg-gray-300'
                    }
                  `}
                />
              ))}
            </div>
            <span className="font-bold text-purple-700">
              {gameState.completedShapes}/{gameState.level}
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Messages */}
      {feedback && (
        <FeedbackMessage
          message={feedback.message}
          type={feedback.type}
          onComplete={() => {}}
        />
      )}

      {/* Celebration */}
      <Celebration
        show={gameState.showCelebration}
        onComplete={handleCelebrationComplete}
      />
    </div>
  );
}

export default App;