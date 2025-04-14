export interface ImageData {
  name: string;
  url: string;
}

export interface ClassificationResult {
  predictedClass: string;
  isCorrect: boolean;
}

export interface OverlayBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ComparisonResult {
  value: number;
  min: number;
  max: number;
}