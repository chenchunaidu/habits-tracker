import type { ReactNode } from "react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  fallback?: ReactNode;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  fallback,
  ...props
}) => {
  const [error, setError] = useState(false);
  if (error) {
    return <div>{fallback}</div>;
  }
  return (
    <img
      className={twMerge("object-fit p-0.5", className)}
      src={src}
      alt={alt}
      onError={(event) => {
        setError(true);
      }}
      {...props}
    />
  );
};

export default Image;
export type { ImageProps };
