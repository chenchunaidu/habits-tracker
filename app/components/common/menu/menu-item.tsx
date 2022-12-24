import type { FC, ReactNode } from "react";

export interface MenuItemProps {
  children: ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ children }) => {
  return <div className="text-xs">{children}</div>;
};

export default MenuItem;
