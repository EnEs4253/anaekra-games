import React, { useEffect } from 'react';

interface FeedbackMessageProps {
  message: string;
  type: 'success' | 'error';
  onComplete: () => void;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ message, type, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <div
        className={`
          px-8 py-4 rounded-2xl text-white font-bold text-xl shadow-2xl
          animate-bounce backdrop-blur-sm
          ${type === 'success' 
            ? 'bg-green-500/90' 
            : 'bg-orange-500/90'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {type === 'success' ? '🎉' : '🤔'}
          </span>
          {message}
        </div>
      </div>
    </div>
  );
};

export default FeedbackMessage;