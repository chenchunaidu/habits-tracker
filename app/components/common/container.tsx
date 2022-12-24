import type { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={twMerge("w-full max-w-xl px-4", className)}>{children}</div>
  );
};

export default Container;
