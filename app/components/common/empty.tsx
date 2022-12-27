import { TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import React from "react";
import Button from "./button";

interface EmptyProps {
  label: string;
  buttonLabel: string;
  buttonLink: string;
}

const Empty: FC<EmptyProps> = ({ label, buttonLabel, buttonLink }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3">
      <TrashIcon className="h-24 w-24 text-slate-200"></TrashIcon>
      <div className="text-slate-500">{label}</div>
      <Link to={buttonLink}>
        <Button>{buttonLabel}</Button>
      </Link>
    </div>
  );
};

export default Empty;
