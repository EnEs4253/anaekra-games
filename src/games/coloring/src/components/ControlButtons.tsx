import React from 'react';
import { RotateCcw, Save, Image } from 'lucide-react';

interface ControlButtonsProps {
  onReset: () => void;
  onSave: () => void;
  onImageSelect: () => void;
}

export default function ControlButtons({ onReset, onSave, onImageSelect }: ControlButtonsProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-purple-600 mb-4 text-center">Kontroller</h3>
      
      <button
        onClick={onImageSelect}
        className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <Image className="w-6 h-6" />
        <span>Farklı Resim</span>
      </button>
      
      <button
        onClick={onReset}
        className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <RotateCcw className="w-6 h-6" />
        <span>Yeniden Başla</span>
      </button>
      
      <button
        onClick={onSave}
        className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
      >
        <Save className="w-6 h-6" />
        <span>Kaydet</span>
      </button>
    </div>
  );
}