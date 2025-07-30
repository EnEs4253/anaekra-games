import React, { useEffect, useRef, useCallback } from 'react';

interface ColoringCanvasProps {
  template: {
    name: string;
    paths: string[];
  };
  selectedColor: string;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  onPaint: () => void;
}

export default function ColoringCanvas({ template, selectedColor, onCanvasReady, onPaint }: ColoringCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const drawTemplate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear and set background
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw template paths
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    template.paths.forEach(pathData => {
      const path = new Path2D(pathData);
      ctx.stroke(path);
    });
  }, [template]);

  const floodFill = useCallback((x: number, y: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    // Convert fill color to RGB
    const hex = fillColor.replace('#', '');
    const fillR = parseInt(hex.substr(0, 2), 16);
    const fillG = parseInt(hex.substr(2, 2), 16);
    const fillB = parseInt(hex.substr(4, 2), 16);

    // Get target color at clicked position
    const targetIndex = (y * width + x) * 4;
    const targetR = data[targetIndex];
    const targetG = data[targetIndex + 1];
    const targetB = data[targetIndex + 2];

    // Don't fill if clicking on same color
    if (targetR === fillR && targetG === fillG && targetB === fillB) {
      return;
    }

    // Flood fill algorithm
    const stack = [[x, y]];
    
    while (stack.length > 0) {
      const [currentX, currentY] = stack.pop()!;
      
      if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) {
        continue;
      }

      const currentIndex = (currentY * width + currentX) * 4;
      
      if (
        data[currentIndex] !== targetR ||
        data[currentIndex + 1] !== targetG ||
        data[currentIndex + 2] !== targetB
      ) {
        continue;
      }

      // Fill current pixel
      data[currentIndex] = fillR;
      data[currentIndex + 1] = fillG;
      data[currentIndex + 2] = fillB;
      data[currentIndex + 3] = 255; // Alpha

      // Add neighboring pixels to stack
      stack.push([currentX + 1, currentY]);
      stack.push([currentX - 1, currentY]);
      stack.push([currentX, currentY + 1]);
      stack.push([currentX, currentY - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = Math.floor((event.clientX - rect.left) * dpr);
    const y = Math.floor((event.clientY - rect.top) * dpr);

    floodFill(x, y, selectedColor);
    onPaint();
  }, [selectedColor, floodFill, onPaint]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    isDrawingRef.current = true;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const touch = event.touches[0];
    const x = Math.floor((touch.clientX - rect.left) * dpr);
    const y = Math.floor((touch.clientY - rect.top) * dpr);

    floodFill(x, y, selectedColor);
    onPaint();
  }, [selectedColor, floodFill, onPaint]);

  const handleTouchEnd = useCallback((event: React.TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    isDrawingRef.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      onCanvasReady(canvas);
      drawTemplate();
    }
  }, [template, onCanvasReady, drawTemplate]);

  useEffect(() => {
    const handleResize = () => {
      drawTemplate();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawTemplate]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-80 md:h-96 lg:h-[500px] border-4 border-purple-200 rounded-2xl cursor-pointer touch-none"
      onClick={handleCanvasClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: 'white',
        imageRendering: 'pixelated'
      }}
    />
  );
}