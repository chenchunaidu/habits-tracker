import React from "react";
import { twMerge } from "tailwind-merge";

const sizes = {
  sm: "py-1 px-2",
  md: "py-2.5 px-2.5 md:py-2.5 md:px-5",
  lg: "py-4 px-4",
  xl: "py-6 px-6",
  "2xl": "py-8",
};

const variants = {
  outline: "bg-white border-lime-500 border text-lime-500",
  solid: "bg-lime-500 hover:bg-lime-600",
  ghost: "bg-white-500 hover:bg-lime-500 border border-gray-900 text-black",
  link: "shadow-none text-black hover:text-lime-500",
  "normal-solid": "px-4 rounded-md shadow-none w-full bg-black hover:bg-black",
};

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "outline" | "solid" | "ghost" | "link" | "normal-solid";
}

const Button: React.FC<ButtonProps> = (props) => {
  const { size = "md", variant = "solid", className, ...remProps } = props;
  return (
    <button
      className={twMerge(
        ` shadow-black-sm rounded-md text-sm text-white active:shadow-none ${
          remProps?.disabled ? "opacity-70" : "opacity-100"
        }`,

        sizes[size],
        variants[variant],
        className
      )}
      {...remProps}
    />
  );
};

export default Button;
