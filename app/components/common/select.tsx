import React from "react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

export interface Option {
  value?: string;
  label?: string;
}

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options?: Option[];
}

const Select: FC<SelectProps> = ({ options = [], className, ...props }) => {
  return (
    <select
      {...props}
      className={twMerge(
        "block w-full rounded-md border border-gray-400 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
        className
      )}
    >
      <option value="">Select option</option>
      {options?.map((opt) => (
        <option value={opt.value} key={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
export type { SelectProps };
