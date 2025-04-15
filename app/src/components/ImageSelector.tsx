import React, { useRef } from 'react';
import AsyncSelect from 'react-select/async';
import { ImageData } from '../types';
import { Search, Image as ImageIcon } from 'lucide-react';
import { api } from '../api';

interface ImageSelectorProps {
  onImageSelect: (image: ImageData) => void;
}


const ImageSelector: React.FC<ImageSelectorProps> = ({ onImageSelect }) => {
  const latestRequest = useRef<Promise<ImageData[]>>()

  const loadImagesList = async (inputValue: string) => {
    const myPromise = latestRequest.current ?? api.getImageList()

    try {
      latestRequest.current = myPromise
      const result = await myPromise

      const filteredImages = result.filter(image =>
        image.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      return filteredImages.map(image => ({
        value: image,
        label: image.name
      }));
    } catch (e) {
      if (latestRequest.current == myPromise) {
        latestRequest.current = undefined
      }
      throw e
    }
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
      backdropFilter: 'blur(10px)',
      zIndex: 50
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 50
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
        loadOptions={loadImagesList}
        onChange={(option) => option && onImageSelect(option.value)}
        placeholder="Search for an image..."
        styles={customStyles}
        menuPortalTarget={document.body}
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