import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'text-blue-500',
    secondary: 'text-gray-500',
    white: 'text-white'
  };

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} border-t-2 border-b-2 border-current`} />
    </div>
  );
};

export default LoadingSpinner;