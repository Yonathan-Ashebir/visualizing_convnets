import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import { Twitch as Switch } from 'lucide-react';
import 'react-resizable/css/styles.css';

interface ImageOverlayProps {
  imageWidth: number;
  imageHeight: number;
  onBoundsChange: (bounds: { x: number; y: number; width: number; height: number }) => void;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ imageWidth, imageHeight, onBoundsChange }) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  // Reset position and size when image dimensions change
  useEffect(() => {
    const initialWidth = Math.min(100, imageWidth / 3);
    const initialHeight = Math.min(100, imageHeight / 3);
    setSize({ width: initialWidth, height: initialHeight });
    setPosition({
      x: Math.min(20, imageWidth - initialWidth),
      y: Math.min(20, imageHeight - initialHeight)
    });
  }, [imageWidth, imageHeight]);

  useEffect(() => {
    if (showOverlay) {
      onBoundsChange({
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height
      });
    }
  }, [position, size, showOverlay, onBoundsChange]);

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    const newX = Math.max(0, Math.min(data.x, imageWidth - size.width));
    const newY = Math.max(0, Math.min(data.y, imageHeight - size.height));
    setPosition({ x: newX, y: newY });
  };

  const handleResize = (_e: any, { size: newSize }: { size: { width: number; height: number } }) => {
    const maxWidth = imageWidth - position.x;
    const maxHeight = imageHeight - position.y;
    
    const width = Math.min(newSize.width, maxWidth);
    const height = Math.min(newSize.height, maxHeight);
    
    setSize({ width, height });
  };

  return (
    <>
      <div 
        style={{ 
          width: `${imageWidth}px`,
          height: `${imageHeight}px`,
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden'
        }}
      >
        {showOverlay && (
          <Draggable
            position={position}
            onDrag={handleDrag}
            bounds={{
              left: 0,
              top: 0,
              right: imageWidth - size.width,
              bottom: imageHeight - size.height
            }}
            handle=".handle"
          >
            <div>
              <ResizableBox
                width={size.width}
                height={size.height}
                onResize={handleResize}
                minConstraints={[50, 50]}
                maxConstraints={[imageWidth - position.x, imageHeight - position.y]}
                resizeHandles={['se']}
                draggableOpts={{ grid: [1, 1] }}
              >
                <div className="handle w-full h-full bg-gray-500 bg-opacity-80 cursor-move border-2 border-white relative group">
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-se-resize" />
                </div>
              </ResizableBox>
            </div>
          </Draggable>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => setShowOverlay(!showOverlay)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            showOverlay ? 'bg-blue-500' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
              showOverlay ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="text-sm font-medium text-slate-200">
          Overlay {showOverlay ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    </>
  );
};

export default ImageOverlay;