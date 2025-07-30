export interface Shape {
  id: string;
  type: ShapeType;
  color: string;
  position: Position;
  isPlaced: boolean;
  isCorrect: boolean;
}

export interface ShapeSlot {
  id: string;
  type: ShapeType;
  position: Position;
  isOccupied: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export enum ShapeType {
  CIRCLE = 'circle',
  TRIANGLE = 'triangle',
  SQUARE = 'square',
  STAR = 'star',
  RECTANGLE = 'rectangle',
  OVAL = 'oval'
}

export enum GameLevel {
  EASY = 3,
  MEDIUM = 5,
  HARD = 7
}

export interface GameState {
  shapes: Shape[];
  slots: ShapeSlot[];
  level: GameLevel;
  completedShapes: number;
  isCompleted: boolean;
  showCelebration: boolean;
}