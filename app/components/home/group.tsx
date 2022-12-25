import type { Group } from "~/models/group.server";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import React from "react";
import Heading from "../common/heading";

interface HomeGroupProps extends Group {
  link?: string;
}

const HomeGroup: FC<Omit<HomeGroupProps, "userId">> = ({
  title,
  description,
  id,
  link,
  image,
}) => {
  const order = title?.length > 15 ? "4" : "3";
  return (
    <div
      className={`flex aspect-video items-center justify-center space-y-1 overflow-hidden break-words rounded-md bg-lime-700 p-4 md:h-36`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundBlendMode: "soft-light",
      }}
    >
      <Link to={`${link}/${id}`}>
        <Heading className="capitalize text-white line-clamp-2" order={order}>
          {title}
        </Heading>
      </Link>
    </div>
  );
};

export default HomeGroup;
