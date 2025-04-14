import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 mb-6 leading-tight">
          Visualizing and Understanding Convolutional Networks
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          This tool contains <b>Occlusion Sensitivity</b>, verifying that the CNN focuses on the foreground object (e.g., a dog's face) rather than irrelevant context (e.g., background grass). And <b>Correspondence Analysis</b>, ensuring feature maps detect semantic structures (eyes, wheels) consistently, not random noise. Together, they validate whether the model learns meaningful patterns or spurious correlations.
        </p>
      </div>
    </div>
  );
};

export default Header;