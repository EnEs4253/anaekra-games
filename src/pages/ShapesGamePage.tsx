import React from 'react';
import ShapesApp from '../games/shapes/src/App';
import '../games/shapes/src/index.css';
import { ArrowLeft } from 'lucide-react';

interface ShapesGamePageProps {
  onNavigate?: (page: string) => void;
}

const ShapesGamePage: React.FC<ShapesGamePageProps> = ({ onNavigate }) => (
  <div className="w-full min-h-screen bg-purple-50 relative">
    {/* Sol üst köşe geri butonu */}
    {onNavigate && (
      <div className="fixed top-8 left-8 z-30 sm:top-10 sm:left-10">
        <button
          onClick={() => onNavigate('play')}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 text-xl sm:text-2xl font-medium bg-white/90 rounded-full px-5 py-3 shadow-lg border border-gray-200"
          style={{ minWidth: 0 }}
        >
          <ArrowLeft size={28} />
          <span>Oyunlar</span>
        </button>
      </div>
    )}
    <ShapesApp />
  </div>
);

export default ShapesGamePage; 