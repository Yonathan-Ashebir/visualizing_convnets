import React from 'react';
import DualImageComparison from './DualImageComparison';

const CorrespondenceAnalysis: React.FC = () => {
  return (
    <div className="container mx-auto px-4 max-h-[100vh]">
      <h2 className="text-3xl font-bold mb-8 text-slate-200 mt-4">Correspondence Analysis</h2>
      <DualImageComparison />
    </div>
  );
};

export default CorrespondenceAnalysis;