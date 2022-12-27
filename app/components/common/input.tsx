import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={twMerge(
        "block w-full rounded-md border border-gray-400 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0",
        className
      )}
    ></input>
  );
};

export default Input;
export type { InputProps };
