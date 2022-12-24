import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface TooltipProps {
  children?: ReactNode;
  content?: string;
  className?: string;
  tooltipTrigger?: "hover" | "click";
}

const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  className,
  tooltipTrigger,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipHideTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return clearTimeout(tooltipHideTimer.current);
  }, []);

  const handleOnClick = () => {
    if (tooltipTrigger === "click") {
      setShowTooltip(true);
      tooltipHideTimer.current = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
  };

  return (
    <div className="relative inline-block" onClick={handleOnClick}>
      {children}
      {showTooltip ? (
        <span
          role="tooltip"
          className={twMerge(
            " absolute left-1/2 bottom-full rounded-md bg-slate-700 py-2 px-4 text-sm text-white",
            className
          )}
        >
          {content}
        </span>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tooltip;
