import React from 'react';
import JumpingApp from '../games/jumping/src/App';
import '../games/jumping/src/index.css';
import '../games/jumping/src/styles.css';
import { ArrowLeft } from 'lucide-react';

interface JumpingGamePageProps {
  onNavigate?: (page: string) => void;
}

const JumpingGamePage: React.FC<JumpingGamePageProps> = ({ onNavigate }) => {
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 relative">
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
      <JumpingApp />
    </div>
  );
};

export default JumpingGamePage; 