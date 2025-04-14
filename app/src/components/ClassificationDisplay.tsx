import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { ClassificationResult } from '../types';

interface ClassificationDisplayProps {
  result: ClassificationResult | null;
}

const ClassificationDisplay: React.FC<ClassificationDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="content-panel">
      <h2 className="text-2xl font-bold mb-4 text-slate-100">Classification Result</h2>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <p className="text-lg text-slate-200">
            Predicted Class: <span className="font-semibold text-slate-100">{result.predictedClass}</span>
          </p>
        </div>
        <div>
          {result.isCorrect ? (
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          ) : (
            <XCircle className="h-8 w-8 text-rose-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassificationDisplay;