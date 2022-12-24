import React from "react";
import { twMerge } from "tailwind-merge";
interface TextProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  variant?: "link" | "default";
}
//TODO: lineClamp

const variants = {
  link: "underline",
  default: "",
};

const Text: React.FC<TextProps> = ({
  children,
  className,
  variant = "default",
}) => {
  return (
    <span
      className={twMerge(
        ` text-slate-700 block text-sm`,
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Text;
