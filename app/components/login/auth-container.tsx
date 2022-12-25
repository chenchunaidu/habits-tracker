import type { ReactNode } from "react";
import React from "react";
import AuthInfo from "./auth-info";

interface AuthContainerProps {
  children: ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-col justify-center md:bg-lime-700 lg:flex-row lg:p-10">
      <div className="item-center hidden w-full justify-center p-10 lg:flex">
        <AuthInfo />
      </div>
      <div className="flex w-full items-center justify-center p-5 md:p-10">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
