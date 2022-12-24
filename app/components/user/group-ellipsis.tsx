import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import Button from "../common/button";
import Menu from "../common/menu/menu";

interface GroupEllipsisProps {
  id: string;
}

const GroupEllipsis: FC<GroupEllipsisProps> = ({ id }) => {
  return (
    <Menu
      trigger="click"
      items={[
        {
          children: (
            <div className="flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <Link to={`/home/groups/${id}/edit`} className="text-sm">
                Recommendations
              </Link>
            </div>
          ),
        },
      ]}
    >
      <Button className="md:px-2.5" variant="link">
        <EllipsisVerticalIcon className="h-6 w-6" />
      </Button>
    </Menu>
  );
};

export default GroupEllipsis;
