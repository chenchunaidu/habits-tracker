import type { FC, ReactNode } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Image from "../common/image";
import logo from "~/assets/images/trackbit.svg";
import Button from "./button";

interface NavLinkProps {
  children: ReactNode;
  to: string;
}

interface HeaderProps {
  userId?: string;
}

export const NavLink: FC<NavLinkProps> = ({ children, to }) => {
  return (
    <Link className="text-base text-slate-700 md:text-sm" to={to}>
      {children}
    </Link>
  );
};

const Header: FC<HeaderProps> = ({ userId }) => {
  return (
    <div className="flex w-full items-center justify-between border bg-white p-4">
      <Image src={logo} className="h-10" />
      <div className="flex items-center space-x-4 md:mr-16 md:space-x-8">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/home/tasks">Tasks</NavLink>
        <NavLink to="/home/account">Account</NavLink>
        <form method="post" action="/logout">
          <Button variant="link" type="submit" className="px-0">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Header;
