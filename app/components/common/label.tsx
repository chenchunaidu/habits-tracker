import type { ReactNode } from "react";
import React from "react";

interface LabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className="space-y-1" {...props}>
      {children}
    </label>
  );
};

export default Label;
