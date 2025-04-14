import React from 'react';
import { ComparisonResult } from '../types';

interface ComparisonDisplayProps {
  result: ComparisonResult | null;
}

const ComparisonDisplay: React.FC<ComparisonDisplayProps> = ({ result }) => {
  if (!result) return null;

  const percentage = ((result.value - result.min) / (result.max - result.min)) * 100;
  const breakpoints = [0, 25, 50, 75, 100].map(p => 
    result.min + (p / 100) * (result.max - result.min)
  );

  return (
    <div className="content-panel">
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Comparison Result</h2>
      <div className="space-y-6">
        <div className="relative">
          <div className="h-6 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-in-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="absolute inset-x-0 top-[80%] -translate-y-1/2 flex justify-between">
            {breakpoints.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-8 w-0.5 bg-white/30" />
                <span className="text-xs font-medium text-white/70 mt-1">{value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-200 mb-1">
            {result.value.toFixed(2)}
          </div>
          <div className="text-sm text-slate-400">
            Current Value
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonDisplay;