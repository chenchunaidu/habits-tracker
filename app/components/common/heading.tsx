import type { ReactNode } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";
interface HeadingProps {
  order?: "1" | "2" | "3" | "4" | "5" | "6";
  className?: string;
  children: ReactNode;
}

const styles = {
  "1": "text-5xl md:text-7xl",
  "2": "text-4xl md:text-6xl",
  "3": "text-3xl md:text-5xl",
  "4": "text-2xl md:text-3xl",
  "5": "text-xl md:text-2xl",
  "6": "text-lg md:text-xl",
};

const Heading: React.FC<HeadingProps> = ({
  order = "1",
  children,
  className,
  ...props
}) => {
  const tag = `h${order}` || "div";
  const newClassName = twMerge(`font-semibold`, styles[order], className);
  return React.createElement(
    tag,
    { ...props, className: newClassName },
    children
  );
};

export default Heading;
