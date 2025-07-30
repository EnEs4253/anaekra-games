import React from 'react';

interface ColorPaletteProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export default function ColorPalette({ colors, selectedColor, onColorSelect }: ColorPaletteProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6">
      <h3 className="text-lg font-bold text-purple-600 mb-4 text-center">Renkler</h3>
      <div className="grid grid-cols-2 gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => onColorSelect(color)}
            className={`
              w-16 h-16 rounded-full border-4 transition-all duration-300 transform hover:scale-110 active:scale-95
              ${selectedColor === color 
                ? 'border-purple-500 shadow-2xl scale-110' 
                : 'border-gray-200 hover:border-purple-300 shadow-lg'
              }
            `}
            style={{ backgroundColor: color }}
            aria-label={`Renk seç: ${color}`}
          >
            {selectedColor === color && (
              <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full shadow-lg animate-pulse"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}