import React, { useState, useCallback } from 'react';
import { Palette, RotateCcw, Save, Image, Volume2 } from 'lucide-react';
import ColoringCanvas from './ColoringCanvas';
import ColorPalette from './ColorPalette';
import ImageSelector from './ImageSelector';
import ControlButtons from './ControlButtons';
import { coloringTemplates } from '../data/coloringTemplates';

export default function ColoringGame() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    '#BB8FCE', '#85C1E9'
  ];

  const playSound = useCallback((type: 'click' | 'paint' | 'success') => {
    if (!soundEnabled) return;
    
    // Simple audio context implementation for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'click':
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        break;
      case 'paint':
        oscillator.frequency.value = 400;
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        break;
      case 'success':
        oscillator.frequency.value = 600;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  }, [soundEnabled]);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
    playSound('click');
  }, [playSound]);

  const handleReset = useCallback(() => {
    if (canvasRef) {
      const ctx = canvasRef.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
        // Redraw the template
        const template = coloringTemplates[selectedTemplate];
        drawTemplate(ctx, template.paths, canvasRef.width, canvasRef.height);
      }
    }
    playSound('click');
  }, [canvasRef, selectedTemplate, playSound]);

  const handleSave = useCallback(() => {
    if (canvasRef) {
      const link = document.createElement('a');
      link.download = `boyama-${coloringTemplates[selectedTemplate].name}.png`;
      link.href = canvasRef.toDataURL();
      link.click();
      playSound('success');
    }
  }, [canvasRef, selectedTemplate, playSound]);

  const handleTemplateSelect = useCallback((templateIndex: number) => {
    setSelectedTemplate(templateIndex);
    setIsImageSelectorOpen(false);
    playSound('click');
  }, [playSound]);

  const drawTemplate = (ctx: CanvasRenderingContext2D, paths: string[], width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    paths.forEach(pathData => {
      const path = new Path2D(pathData);
      ctx.stroke(path);
    });
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-600 flex items-center gap-3">
          <Palette className="w-8 h-8 md:w-10 h:10" />
          <span>Boyama Oyunu</span>
        </h1>
        
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            soundEnabled 
              ? 'bg-green-100 text-green-600' 
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      {/* Game Area */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas Area */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="bg-white rounded-3xl shadow-2xl p-4 md:p-8">
            <ColoringCanvas
              template={coloringTemplates[selectedTemplate]}
              selectedColor={selectedColor}
              onCanvasReady={setCanvasRef}
              onPaint={() => playSound('paint')}
            />
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="order-1 lg:order-2 space-y-6">
          {/* Control Buttons */}
          <ControlButtons
            onReset={handleReset}
            onSave={handleSave}
            onImageSelect={() => setIsImageSelectorOpen(true)}
          />
          
          {/* Color Palette */}
          <ColorPalette
            colors={colors}
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
          />
        </div>
      </div>

      {/* Image Selector Modal */}
      {isImageSelectorOpen && (
        <ImageSelector
          templates={coloringTemplates}
          selectedTemplate={selectedTemplate}
          onSelect={handleTemplateSelect}
          onClose={() => setIsImageSelectorOpen(false)}
        />
      )}
      
      {/* Footer */}
      <div className="mt-8 text-center text-purple-500 text-sm">
        <p>🎨 3-7 yaş çocuklar için özel tasarlandı</p>
      </div>
    </div>
  );
}