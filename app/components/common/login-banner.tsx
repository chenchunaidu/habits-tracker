import React from "react";
import { Link } from "react-router-dom";
import Button from "./button";

export default function LoginBanner() {
  return (
    <div className="flex w-full flex-col space-y-4 pb-2 text-white md:max-w-2xl md:flex-row md:space-x-2 md:space-y-0 md:pb-1">
      <div className="flex w-full flex-col">
        <div className="text-lg font-semibold">Login to Trackbit</div>
        <div className="text-xs md:text-sm">
          Track your habits easily now with Trackbit
        </div>
      </div>
      <div className="flex w-full space-x-4 md:flex-row">
        <Link to="/login" className="w-full">
          <Button variant="outline" className="w-full">
            Login
          </Button>
        </Link>
        <Link to="/sign-up" className="w-full">
          <Button
            variant="link"
            className="w-full border border-white text-white hover:text-white"
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
