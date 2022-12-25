import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import Image from "./image";
import type { ImageProps } from "./image";

interface AvatarProps extends ImageProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

interface FallbackAvatarProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const sizes = {
  xs: "md:h-6 md:w-6",
  sm: "h-9 w-9",
  md: "h-12 w-12",
  lg: "h-10 w-10 md:h-16 md:w-16",
  xl: "h-12 w-12 md:h-24 md:w-24",
  "2xl": "h-24 w-24 md:h-36 md:w-36",
};

const FallbackAvatar: FC<FallbackAvatarProps> = ({ size, className }) => {
  return (
    <div
      className={twMerge(
        "rounded-full bg-gradient-to-r from-lime-600 via-lime-900 to-orange-500",
        sizes[size],
        className
      )}
    ></div>
  );
};

const Avatar: React.FC<AvatarProps> = ({
  className,
  size = "md",
  ...props
}) => {
  if (!props.src) {
    return <FallbackAvatar size={size} className={className} />;
  }
  return (
    <Image
      className={twMerge("rounded-full", sizes[size], className)}
      {...props}
      fallback={<FallbackAvatar size={size} className={className} />}
    />
  );
};

export default Avatar;
