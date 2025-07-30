import React, { useState, useRef } from 'react';
import { Shape, ShapeType } from '../types/game';
import { SHAPE_COLORS } from '../constants/gameConfig';

interface GameShapeProps {
  shape: Shape;
  onDragStart: (shapeId: string) => void;
  onTouchStart: (shapeId: string, e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  isDragging: boolean;
  showSuccess: boolean;
  showError: boolean;
  onShapeClick: (shapeId: string) => void;
}

const GameShape: React.FC<GameShapeProps> = ({
  shape,
  onDragStart,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  isDragging,
  showSuccess,
  showError,
  onShapeClick
}) => {
  const shapeRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', shape.id);
    onDragStart(shape.id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    onTouchStart(shape.id, e);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click during drag operations
    if (!isDragging) {
      e.stopPropagation();
      onShapeClick(shape.id);
    }
  };

  const renderShape = () => {
    const color = SHAPE_COLORS[shape.type];
    const baseClasses = "w-full h-full drop-shadow-lg";
    
    switch (shape.type) {
      case ShapeType.CIRCLE:
        return (
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            fill={color}
            className={baseClasses}
          />
        );
      case ShapeType.TRIANGLE:
        return (
          <polygon 
            points="50,15 20,75 80,75" 
            fill={color}
            className={baseClasses}
          />
        );
      case ShapeType.SQUARE:
        return (
          <rect 
            x="20" 
            y="20" 
            width="60" 
            height="60" 
            rx="8"
            fill={color}
            className={baseClasses}
          />
        );
      case ShapeType.STAR:
        return (
          <polygon 
            points="50,10 60,35 85,35 67,53 73,78 50,65 27,78 33,53 15,35 40,35" 
            fill={color}
            className={baseClasses}
          />
        );
      case ShapeType.RECTANGLE:
        return (
          <rect 
            x="15" 
            y="30" 
            width="70" 
            height="40" 
            rx="6"
            fill={color}
            className={baseClasses}
          />
        );
      case ShapeType.OVAL:
        return (
          <ellipse 
            cx="50" 
            cy="50" 
            rx="40" 
            ry="25" 
            fill={color}
            className={baseClasses}
          />
        );
      default:
        return null;
    }
  };

  if (shape.isPlaced) {
    return null;
  }

  return (
    <div
      ref={shapeRef}
      className={`
        w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
        cursor-grab active:cursor-grabbing select-none
        transition-all duration-300 relative
        ${isDragging ? 'scale-110 rotate-3 z-50' : 'hover:scale-105'}
        ${showSuccess ? 'animate-bounce' : ''}
        ${showError ? 'animate-shake' : ''}
      `}
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClick={handleClick}
      style={{
        touchAction: 'none'
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {renderShape()}
      </svg>
      
      {/* Success sparkles */}
      {showSuccess && (
        <>
          <div className="absolute -top-2 -left-2 text-yellow-300 animate-ping">✨</div>
          <div className="absolute -top-2 -right-2 text-yellow-300 animate-ping animation-delay-200">✨</div>
          <div className="absolute -bottom-2 -left-2 text-yellow-300 animate-ping animation-delay-400">✨</div>
          <div className="absolute -bottom-2 -right-2 text-yellow-300 animate-ping animation-delay-600">✨</div>
        </>
      )}
      
      {/* Error indicator */}
      {showError && (
        <div className="absolute inset-0 bg-red-400/30 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default GameShape;