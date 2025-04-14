import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ImageData, OverlayBounds, ComparisonResult } from '../types';
import ImageSelector from './ImageSelector';
import ComparisonDisplay from './ComparisonDisplay';
import ImageOverlay from './ImageOverlay';

interface DualImageComparisonProps {
  onComparisonChange?: (result: ComparisonResult) => void;
}

const DualImageComparison: React.FC<DualImageComparisonProps> = ({ onComparisonChange }) => {
  const [leftImage, setLeftImage] = useState<ImageData | null>(null);
  const [rightImage, setRightImage] = useState<ImageData | null>(null);
  const [leftDimensions, setLeftDimensions] = useState({ width: 0, height: 0 });
  const [rightDimensions, setRightDimensions] = useState({ width: 0, height: 0 });
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);

  const handleLeftImageLoad = () => {
    if (leftImageRef.current) {
      setLeftDimensions({
        width: leftImageRef.current.clientWidth,
        height: leftImageRef.current.clientHeight
      });
    }
  };

  const handleRightImageLoad = () => {
    if (rightImageRef.current) {
      setRightDimensions({
        width: rightImageRef.current.clientWidth,
        height: rightImageRef.current.clientHeight
      });
    }
  };

  const simulateComparison = useCallback((bounds: OverlayBounds) => {
    const value = Math.random() * 100;
    const result: ComparisonResult = {
      value,
      min: 0,
      max: 100
    };
    setComparisonResult(result);
    if (onComparisonChange) {
      onComparisonChange(result);
    }
  }, [onComparisonChange]);

  const handleBoundsChange = useCallback((bounds: OverlayBounds) => {
    simulateComparison(bounds);
  }, [simulateComparison]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="content-panel">
            <h3 className="text-lg font-semibold mb-2 text-slate-100">First Image</h3>
            <ImageSelector onImageSelect={setLeftImage} />
          </div>
          {leftImage && (
            <div className="content-panel">
              <div className="relative" style={{ width: 'fit-content' }}>
                <img
                  ref={leftImageRef}
                  src={leftImage.url}
                  alt={leftImage.name}
                  className="rounded-lg"
                  style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                  onLoad={handleLeftImageLoad}
                />
                {leftDimensions.width > 0 && (
                  <ImageOverlay
                    imageWidth={leftDimensions.width}
                    imageHeight={leftDimensions.height}
                    onBoundsChange={handleBoundsChange}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="content-panel">
            <h3 className="text-lg font-semibold mb-2 text-slate-100">Second Image</h3>
            <ImageSelector onImageSelect={setRightImage} />
          </div>
          {rightImage && (
            <div className="content-panel">
              <div className="relative" style={{ width: 'fit-content' }}>
                <img
                  ref={rightImageRef}
                  src={rightImage.url}
                  alt={rightImage.name}
                  className="rounded-lg"
                  style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                  onLoad={handleRightImageLoad}
                />
                {rightDimensions.width > 0 && (
                  <ImageOverlay
                    imageWidth={rightDimensions.width}
                    imageHeight={rightDimensions.height}
                    onBoundsChange={handleBoundsChange}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ComparisonDisplay result={comparisonResult} />
    </div>
  );
};

export default DualImageComparison;