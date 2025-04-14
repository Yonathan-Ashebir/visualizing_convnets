import React from 'react';
import Header from './components/Header';
import OcclusionAnalysis from './components/OcclusionAnalysisSection';
import CorrespondenceAnalysis from './components/CorrespondenceAnalysisSection';

function App() {
  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory">
      <div className="min-h-screen snap-start flex items-center">
        <Header />
      </div>
      <div className="min-h-screen snap-start flex items-center">
        <OcclusionAnalysis />
      </div>
      <div className="min-h-screen snap-start flex items-center">
        <CorrespondenceAnalysis />
      </div>
    </div>
  );
}

export default App;