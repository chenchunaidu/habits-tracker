import type { ReactNode } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface FullscreenProps {
  children: ReactNode;
  className?: string;
}

const Fullscreen: React.FC<FullscreenProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`h-full-screen w-screen`, className)}>
      {children}
    </div>
  );
};

export default Fullscreen;
