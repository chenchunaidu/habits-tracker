import type { FC, ReactNode } from "react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import type { MenuItemProps } from "./menu-item";
import MenuList from "./menu-list";

interface MenuProps {
  children?: ReactNode;
  className?: string;
  trigger?: "hover" | "click";
  items?: MenuItemProps[];
}

const Menu: FC<MenuProps> = ({ children, className, trigger, items = [] }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleOnClick = () => {
    if (trigger === "click") {
      setShowMenu(!showMenu);
    }
  };

  return (
    <div className="relative" onClick={handleOnClick}>
      {children}
      {showMenu ? (
        <span
          role="menu"
          className={twMerge(
            " absolute right-0 top-full rounded-md bg-white py-2 px-4",
            className
          )}
        >
          <MenuList items={items} />
        </span>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Menu;
