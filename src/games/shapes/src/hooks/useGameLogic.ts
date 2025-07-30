import { useState, useCallback, useRef } from 'react';
import { Shape, ShapeSlot, GameState, GameLevel, ShapeType, Position } from '../types/game';
import { SHAPE_COLORS, SHAPE_NAMES, TURKISH_MESSAGES } from '../constants/gameConfig';
import { useAudio } from './useAudio';

const SHAPE_TYPES = [
  ShapeType.CIRCLE,
  ShapeType.TRIANGLE,
  ShapeType.SQUARE,
  ShapeType.STAR,
  ShapeType.RECTANGLE,
  ShapeType.OVAL
];

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame(GameLevel.EASY));
  const [draggedShapeId, setDraggedShapeId] = useState<string | null>(null);
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const touchStartPos = useRef<Position>({ x: 0, y: 0 });
  const { playSuccessSound, playErrorSound, playClickSound, speakText } = useAudio();

  function initializeGame(level: GameLevel): GameState {
    const selectedShapeTypes = SHAPE_TYPES.slice(0, level);
    
    // Create shapes
    const shapes: Shape[] = selectedShapeTypes.map((type, index) => ({
      id: `shape-${index}`,
      type,
      color: SHAPE_COLORS[type],
      position: { x: 0, y: 0 }, // Will be positioned by CSS
      isPlaced: false,
      isCorrect: false
    }));

    // Create slots in random order
    const shuffledTypes = [...selectedShapeTypes].sort(() => Math.random() - 0.5);
    const slots: ShapeSlot[] = shuffledTypes.map((type, index) => ({
      id: `slot-${index}`,
      type,
      position: { x: 0, y: 0 }, // Will be positioned by CSS
      isOccupied: false
    }));

    return {
      shapes,
      slots,
      level,
      completedShapes: 0,
      isCompleted: false,
      showCelebration: false
    };
  }

  const startNewGame = useCallback((level: GameLevel) => {
    setGameState(initializeGame(level));
    setDraggedShapeId(null);
    setDragOverSlotId(null);
    setFeedback(null);
  }, []);

  const handleDragStart = useCallback((shapeId: string) => {
    setDraggedShapeId(shapeId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, slotId?: string) => {
    e.preventDefault();
    setDragOverSlotId(slotId || null);
  }, []);

  const handleDrop = useCallback((slotId: string) => {
    if (!draggedShapeId) return;

    const draggedShape = gameState.shapes.find(s => s.id === draggedShapeId);
    const targetSlot = gameState.slots.find(s => s.id === slotId);

    if (!draggedShape || !targetSlot || targetSlot.isOccupied) return;

    const isCorrectMatch = draggedShape.type === targetSlot.type;

    if (isCorrectMatch) {
      // Successful match
      setGameState(prevState => {
        const newShapes = prevState.shapes.map(shape =>
          shape.id === draggedShapeId
            ? { ...shape, isPlaced: true, isCorrect: true }
            : shape
        );
        
        const newSlots = prevState.slots.map(slot =>
          slot.id === slotId
            ? { ...slot, isOccupied: true }
            : slot
        );

        const completedShapes = prevState.completedShapes + 1;
        const isCompleted = completedShapes === prevState.level;

        return {
          ...prevState,
          shapes: newShapes,
          slots: newSlots,
          completedShapes,
          isCompleted,
          showCelebration: isCompleted
        };
      });

      // Show success feedback
      const shapeName = SHAPE_NAMES[draggedShape.type];
      setFeedback({
        message: `Aferin! ${shapeName.charAt(0).toUpperCase() + shapeName.slice(1)}!`,
        type: 'success'
      });

      if (soundEnabled) {
        playSuccessSound();
        setTimeout(() => {
          speakText(`Aferin! ${shapeName}!`);
        }, 300);
      }
    } else {
      // Wrong match
      setFeedback({
        message: TURKISH_MESSAGES.ERROR,
        type: 'error'
      });

      if (soundEnabled) {
        playErrorSound();
        setTimeout(() => {
          speakText(TURKISH_MESSAGES.ERROR);
        }, 200);
      }
    }

    // Clear feedback after delay
    setTimeout(() => setFeedback(null), 2000);

    setDraggedShapeId(null);
    setDragOverSlotId(null);
  }, [draggedShapeId, gameState.shapes, gameState.slots, soundEnabled]);

  const handleTouchStart = useCallback((shapeId: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    setDraggedShapeId(shapeId);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    // Touch move logic would be implemented here for mobile drag
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!draggedShapeId) return;

    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Find the slot element
    const slotElement = element?.closest('[data-slot-id]');
    if (slotElement) {
      const slotId = slotElement.getAttribute('data-slot-id');
      if (slotId) {
        handleDrop(slotId);
      }
    }

    setDraggedShapeId(null);
  }, [draggedShapeId, handleDrop]);

  const handleCelebrationComplete = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      showCelebration: false
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const handleShapeClick = useCallback((shapeId: string) => {
    const shape = gameState.shapes.find(s => s.id === shapeId);
    if (shape && !shape.isPlaced) {
      const shapeName = SHAPE_NAMES[shape.type];
      
      // Show feedback message with shape name
      setFeedback({
        message: shapeName.charAt(0).toUpperCase() + shapeName.slice(1),
        type: 'success'
      });

      if (soundEnabled) {
        playClickSound();
        setTimeout(() => {
          speakText(shapeName);
        }, 100);
      }

      // Clear feedback after delay
      setTimeout(() => setFeedback(null), 1500);
    }
  }, [gameState.shapes, soundEnabled, playClickSound, speakText]);

  return {
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
  };
};