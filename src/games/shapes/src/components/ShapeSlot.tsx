import React from 'react';
import { ShapeSlot as ShapeSlotType, ShapeType } from '../types/game';

interface ShapeSlotProps {
  slot: ShapeSlotType;
  onDrop: (slotId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  isDragOver: boolean;
}

const ShapeSlot: React.FC<ShapeSlotProps> = ({ slot, onDrop, onDragOver, isDragOver }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(slot.id);
  };

  const baseClasses = "w-full h-full transition-all duration-300";

  const renderSlotShape = () => {
    const strokeClasses = isDragOver 
      ? "stroke-white stroke-4" 
      : "stroke-gray-300 stroke-2";
    
    switch (slot.type) {
      case ShapeType.CIRCLE:
        return (
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            fill="transparent" 
            className={`${strokeClasses} stroke-dasharray-[8,4]`}
          />
        );
      case ShapeType.TRIANGLE:
        return (
          <polygon 
            points="50,15 20,75 80,75" 
            fill="transparent" 
            className={`${strokeClasses} stroke-dasharray-[8,4]`}
          />
        );
      case ShapeType.SQUARE:
        return (
          <rect 
            x="20" 
            y="20" 
            width="60" 
            height="60" 
            fill="transparent" 
            className={`${strokeClasses} stroke-dasharray-[8,4]`}
          />
        );
      case ShapeType.STAR:
        return (
          <polygon 
            points="50,10 60,35 85,35 67,53 73,78 50,65 27,78 33,53 15,35 40,35" 
            fill="transparent" 
            className={`${strokeClasses} stroke-dasharray-[8,4]`}
          />
        );
      case ShapeType.RECTANGLE:
        return (
          <rect 
            x="15" 
            y="30" 
            width="70" 
            height="40" 
            fill="transparent" 
            className={`${strokeClasses} stroke-dasharray-[8,4]`}
          />
        );
      case ShapeType.OVAL:
        return (
          <ellipse 
            cx="50" 
            cy="50" 
            rx="40" 
            ry="25" 
            fill="transparent" 
            className={`${strokeClasses} stroke-dasharray-[8,4]`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`
        w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36
        rounded-2xl transition-all duration-300 relative
        ${isDragOver ? 'bg-white/30 scale-105 shadow-lg' : 'bg-white/10'}
        ${slot.isOccupied ? 'bg-green-100/20' : ''}
      `}
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      <svg viewBox="0 0 100 100" className={baseClasses}>
        {renderSlotShape()}
      </svg>
      
      {/* Glow effect when drag over */}
      {isDragOver && (
        <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse" />
      )}
    </div>
  );
};

export default ShapeSlot;