import type { FC } from "react";
import type { GroupProps } from "./group";
import Group from "./group";

interface GroupsProps {
  groups: GroupProps[];
}

const Groups: FC<GroupsProps> = ({ groups }) => {
  return (
    <div className="flex space-y-8 flex-col">
      {groups?.map((group) => (
        <Group key={group.id} {...group} />
      ))}
    </div>
  );
};

export default Groups;
export type { GroupsProps };
