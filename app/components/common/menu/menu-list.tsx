import type { FC } from "react";
import type { MenuItemProps } from "./menu-item";

export interface MenuListProps {
  items?: MenuItemProps[];
}

const MenuList: FC<MenuListProps> = ({ items }) => {
  return (
    <div className="space-y-2">
      {items?.map((item, index) => (
        <div key={index}>{item.children}</div>
      ))}
    </div>
  );
};

export default MenuList;
