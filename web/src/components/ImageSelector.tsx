import React from 'react';
import AsyncSelect from 'react-select/async';
import { ImageData } from '../types';
import { Search, Image as ImageIcon } from 'lucide-react';

interface ImageSelectorProps {
  onImageSelect: (image: ImageData) => void;
}

const demoImages: ImageData[] = [
  {
    name: "Mountain Landscape",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    width: 2000,
    height: 1333
  },
  {
    name: "Ocean Sunset",
    url: "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875",
    width: 2448,
    height: 1624
  },
  {
    name: "Forest Path",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    width: 2560,
    height: 1600
  },
  {
    name: "City Skyline",
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    width: 1920,
    height: 1280
  }
];

const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect }) => {
  const loadOptions = async (inputValue: string) => {
    const filteredImages = demoImages.filter(image =>
      image.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    return filteredImages.map(image => ({
      value: image,
      label: image.name
    }));
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      background: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      '&:hover': {
        borderColor: 'rgba(59, 130, 246, 0.5)'
      }
    }),
    input: (base: any) => ({
      ...base,
      color: '#e2e8f0'
    }),
    option: (base: any, state: { isFocused: boolean }) => ({
      ...base,
      backgroundColor: state.isFocused ? 'rgba(59, 130, 246, 0.2)' : 'rgba(15, 23, 42, 0.9)',
      color: '#e2e8f0',
      '&:hover': {
        backgroundColor: 'rgba(59, 130, 246, 0.2)'
      }
    }),
    menu: (base: any) => ({
      ...base,
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(10px)'
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#e2e8f0'
    }),
    placeholder: (base: any) => ({
      ...base,
      color: '#94a3b8'
    })
  };

  return (
    <div className="w-full space-y-4">
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={(option) => option && onImageSelect(option.value)}
        placeholder="Search for an image..."
        styles={customStyles}
        components={{
          DropdownIndicator: () => (
            <Search className="mr-2 h-4 w-4 text-slate-400" />
          )
        }}
      />
    </div>
  );
};

export default ImageSelector;