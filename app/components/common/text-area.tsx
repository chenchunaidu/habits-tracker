import React from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      {...props}
      className={twMerge(
        "block w-full resize-none rounded-md border border-gray-400 p-2.5  text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
        className
      )}
    ></textarea>
  );
};

export default TextArea;
export type { TextAreaProps };
