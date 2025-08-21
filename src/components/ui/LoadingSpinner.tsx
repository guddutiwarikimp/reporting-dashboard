import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <div className="text-lg font-semibold">{message}</div>
    </div>
  );
};

export default LoadingSpinner;
