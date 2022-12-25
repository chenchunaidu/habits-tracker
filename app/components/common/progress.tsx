import React from "react";

interface ProgressProps {
  progress: number;
  children?: React.ReactNode;
}

export const Progress: React.FC<ProgressProps> = ({ progress, children }) => {
  return (
    <div className="space-y-2">
      {children}
      <div className="h-3 w-full rounded-md bg-gray-300">
        <div
          className="h-full rounded-md bg-gradient-to-r from-lime-300 to-lime-400"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
