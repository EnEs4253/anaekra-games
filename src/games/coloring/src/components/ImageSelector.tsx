import React from 'react';
import { X } from 'lucide-react';

interface Template {
  name: string;
  paths: string[];
  preview: string;
}

interface ImageSelectorProps {
  templates: Template[];
  selectedTemplate: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function ImageSelector({ templates, selectedTemplate, onSelect, onClose }: ImageSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-100">
          <h2 className="text-2xl font-bold text-purple-600">Resim Seç</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Template Grid */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[60vh]">
          {templates.map((template, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                p-4 rounded-2xl border-4 transition-all duration-300 transform hover:scale-105 active:scale-95
                ${selectedTemplate === index 
                  ? 'border-purple-500 bg-purple-50 shadow-2xl' 
                  : 'border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl'
                }
              `}
            >
              <div className="aspect-square bg-white rounded-xl mb-3 flex items-center justify-center text-6xl">
                {template.preview}
              </div>
              <p className="font-bold text-sm text-purple-600 capitalize">
                {template.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}