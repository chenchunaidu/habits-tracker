import React from "react";
import { NavLink } from "../common/header";

export default function NavFloater() {
  return (
    <div className="flex justify-center">
      <div className="fixed bottom-8 flex items-center space-x-2 rounded-full bg-lime-400 px-4 py-2 shadow-lg">
        <NavLink to="/home" className="text-lg">
          Habits
        </NavLink>
        <div>|</div>
        <NavLink to="/home/tasks" className="text-lg">
          Tasks
        </NavLink>
        <div>|</div>
        <NavLink to="/home/journal" className="text-lg">
          Journal
        </NavLink>
      </div>
    </div>
  );
}
