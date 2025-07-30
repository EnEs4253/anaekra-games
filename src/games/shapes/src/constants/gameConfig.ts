import { ShapeType } from '../types/game';

export const SHAPE_COLORS = {
  [ShapeType.CIRCLE]: '#FF6B6B',
  [ShapeType.TRIANGLE]: '#4ECDC4',
  [ShapeType.SQUARE]: '#45B7D1',
  [ShapeType.STAR]: '#FFA07A',
  [ShapeType.RECTANGLE]: '#98D8C8',
  [ShapeType.OVAL]: '#F7DC6F'
};

export const SHAPE_NAMES = {
  [ShapeType.CIRCLE]: 'daire',
  [ShapeType.TRIANGLE]: 'üçgen',
  [ShapeType.SQUARE]: 'kare',
  [ShapeType.STAR]: 'yıldız',
  [ShapeType.RECTANGLE]: 'dikdörtgen',
  [ShapeType.OVAL]: 'oval'
};

export const TURKISH_MESSAGES = {
  SUCCESS: (shapeName: string) => `${shapeName.charAt(0).toUpperCase() + shapeName.slice(1)}`,
  ERROR: 'Bir daha dene!',
  COMPLETED: 'Tebrikler! Harikasın!',
  CONTINUE: 'Devam Et',
  RESTART: 'Yeniden Oyna',
  NEW_GAME: 'Yeni Oyun'
};

export const ANIMATION_DURATION = {
  SHAPE_RETURN: 500,
  SUCCESS_SPARKLE: 800,
  CELEBRATION: 2000
};