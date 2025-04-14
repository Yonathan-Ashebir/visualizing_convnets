import React, { useState, useCallback, useRef } from 'react';
import { ImageData, ClassificationResult } from '../types';
import ImageSelector from './ImageSelector';
import ClassificationDisplay from './ClassificationDisplay';
import ImageOverlay from './ImageOverlay';

const OcclusionAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

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
    const mockClassification: ClassificationResult = {
      predictedClass: "Sample Class",
      isCorrect: Math.random() > 0.5
    };
    setClassification(mockClassification);
  };

  const handleBoundsChange = useCallback(async (bounds: any) => {
    if (!selectedImage) return;
    try {
      console.log('Sending bounds to API:', {
        imageId: selectedImage.name,
        bounds: bounds
      });
    } catch (error) {
      console.error('Error updating bounds:', error);
    }
  }, [selectedImage]);

  return (
    <section className="container mx-auto px-4 min-h-[100vh]">
      <h2 className="text-3xl font-bold mb-8 text-slate-200 mt-4">Occlusion Sensitivity</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-6 neon-border">
            <h2 className="text-2xl font-bold mb-4 text-slate-200">Image Selection</h2>
            <ImageSelector onImageSelect={handleImageSelect} />
          </div>

          {selectedImage && (
            <div className="glass-panel rounded-xl p-6 neon-border">
              <div className="relative" style={{ width: 'fit-content' }}>
                <img
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