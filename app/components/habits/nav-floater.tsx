import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@remix-run/react";
import React from "react";
import { NavLink } from "../common/header";

export default function NavFloater() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);
  return (
    <div className="flex justify-center">
      <div className="fixed bottom-8 flex items-center space-x-2 rounded-full bg-stone-900 px-4 py-2 text-white shadow-lg">
        <div onClick={goBack}>
          <ArrowLeftIcon className="h-4 w-4" />
        </div>
        <div>|</div>
        <NavLink to="/home" className="text-lg text-white">
          Habits
        </NavLink>
        <div>|</div>
        <NavLink to="/home/tasks" className="text-lg text-white">
          Tasks
        </NavLink>
        <div>|</div>
        <NavLink to="/home/journal" className="text-lg text-white">
          Journal
        </NavLink>
        <div>|</div>
        <div onClick={goForward}>
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
