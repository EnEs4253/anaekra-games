import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface QuizPageProps {
  onNavigate?: (page: string) => void;
}

const quizButtons = [
  { id: 'quiz-alphabet', label: 'Alfabe', color: 'from-pink-400 to-yellow-400', emoji: '🔤' },
  { id: 'quiz-colors', label: 'Renkler', color: 'from-blue-400 to-green-400', emoji: '🌈' },
  { id: 'quiz-shapes', label: 'Şekiller', color: 'from-purple-400 to-indigo-400', emoji: '🔷' },
];

const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => (
  <div className="min-h-screen pb-20 md:pb-8 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 flex flex-col items-center relative">
    {/* Geri Butonu */}
    {onNavigate && (
      <div className="fixed top-8 left-8 z-30 sm:top-10 sm:left-10">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 text-xl sm:text-2xl font-medium bg-white/90 rounded-full px-5 py-3 shadow-lg border border-gray-200"
          style={{ minWidth: 0 }}
        >
          <ArrowLeft size={28} />
          <span>Ana Sayfa</span>
        </button>
      </div>
    )}
    {/* Üstte başlık ve animasyonlu emojiler */}
    <section className="relative overflow-hidden w-full bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 py-12 sm:py-20 mb-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 animate-bounce">
          <span className="text-yellow-400 text-4xl">🌟</span>
        </div>
        <div className="absolute top-20 right-16 animate-pulse">
          <span className="text-pink-400 text-3xl">🎈</span>
        </div>
        <div className="absolute bottom-16 left-1/4 animate-bounce delay-300">
          <span className="text-blue-400 text-3xl">🎯</span>
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-500">
          <span className="text-purple-400 text-4xl">🧠</span>
        </div>
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
          Bil Bakalım! <span className="inline-block">❓</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Hangi testi çözmek istersin? Her biri eğlenceli sorularla dolu!
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <span className="text-3xl sm:text-4xl animate-bounce">🔤</span>
          <span className="text-3xl sm:text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🌈</span>
          <span className="text-3xl sm:text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>🔷</span>
        </div>
      </div>
    </section>
    {/* Test kutusu ve butonlar */}
    <div className="bg-gradient-to-br from-yellow-400 to-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-white min-h-[220px] flex flex-col justify-center items-center w-full max-w-md -mt-16 z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Bir test seç!</h2>
      <div className="flex flex-col gap-6 items-center w-full">
        {quizButtons.map((btn, i) => (
          <button
            key={btn.id}
            className={`w-64 sm:w-80 py-4 rounded-2xl font-bold text-xl sm:text-2xl bg-gradient-to-r ${btn.color} shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 animate-fade-in`}
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={() => {/* Burada ilgili teste yönlendirme yapılabilir */}}
          >
            <span className="text-2xl sm:text-3xl">{btn.emoji}</span>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default QuizPage; 