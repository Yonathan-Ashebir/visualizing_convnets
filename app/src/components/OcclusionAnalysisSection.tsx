import React, { useState, useCallback, useRef } from 'react';
import { ImageData, ClassificationResult, OverlayBounds } from '../types';
import ImageSelector from './ImageSelector';
import ClassificationDisplay from './ClassificationDisplay';
import ImageOverlay from './ImageOverlay';

const OcclusionAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Generate random critical area
  const [criticalArea] = useState(() => {
    const x = Math.floor(Math.random() * 40) + 10; // Random x between 10-50
    const y = Math.floor(Math.random() * 40) + 10; // Random y between 10-50
    const width = Math.floor(Math.random() * 20) + 40; // Random width between 40-60
    const height = Math.floor(Math.random() * 20) + 40; // Random height between 40-60
    return { x, y, width, height };
  });

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.clientWidth,
        height: imageRef.current.clientHeight
      });
    }
  };

  const handleImageSelect = async (image: ImageData) => {
    setSelectedImage(image);
    setClassification({
      predictedClass: image.name.split("-")[1],
      isCorrect: true
    });
  };

  const calculateOverlap = (bounds: OverlayBounds) => {
    const criticalPixels = criticalArea.width * criticalArea.height;
    
    // Calculate intersection
    const xOverlap = Math.max(0, 
      Math.min(criticalArea.x + criticalArea.width, bounds.x + bounds.width) - 
      Math.max(criticalArea.x, bounds.x)
    );
    
    const yOverlap = Math.max(0,
      Math.min(criticalArea.y + criticalArea.height, bounds.y + bounds.height) -
      Math.max(criticalArea.y, bounds.y)
    );

    const overlapArea = xOverlap * yOverlap;
    return (overlapArea / criticalPixels) * 100;
  };

  const handleBoundsChange = useCallback((bounds: OverlayBounds) => {
    if (!selectedImage) return;

    const overlapPercentage = calculateOverlap(bounds);
    
    setClassification({
      predictedClass: "Sample Class",
      isCorrect: overlapPercentage < 50 // Classification fails if more than 50% of critical area is covered
    });
  }, [selectedImage, criticalArea]);

  return (
    <section className="container mx-auto px-4 min-h-[100vh]">
      <h2 className="text-3xl font-bold mb-8 text-slate-200 mt-4">Occlusion Sensitivity</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-6 neon-border z-50">
            <h2 className="text-2xl font-bold mb-4 text-slate-200">Image Selection</h2>
            <ImageSelector onImageSelect={handleImageSelect} />
          </div>

          {selectedImage && (
            <div className="glass-panel rounded-xl p-6 neon-border">
              <div className="relative" style={{ width: 'fit-content' }}>
                <img
                  ref={imageRef}
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="rounded-lg"
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                  onLoad={handleImageLoad}
                />
                {imageDimensions.width > 0 && (
                  <ImageOverlay
                    imageWidth={imageDimensions.width}
                    imageHeight={imageDimensions.height}
                    onBoundsChange={handleBoundsChange}
                  />
                )}
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {selectedImage.name} ({imageDimensions.width}x{imageDimensions.height})
              </p>
            </div>
          )}
        </div>

        <div>
          <ClassificationDisplay result={classification} />
        </div>
      </div>
    </section>
  );
};

export default OcclusionAnalysis;