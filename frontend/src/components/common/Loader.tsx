import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <div className={`animate-spin rounded-full border-2 border-[#e6e1d5] border-t-[#CDA047] ${sizeClasses[size]}`}></div>
      {text && <p className="ml-2 text-sm text-white">{text}</p>}
    </div>
  );
};

export default Loader;
