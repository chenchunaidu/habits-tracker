import type { FC, ReactNode } from "react";
import Button from "./button";
import Tooltip from "./tooltip";

interface CopyToClipBoardButtonProps {
  children: ReactNode;
  copyText: string;
}

const CopyToClipBoardButton: FC<CopyToClipBoardButtonProps> = ({
  children,
  copyText,
}) => {
  return (
    <Tooltip
      content="Link copied to clipboard"
      className="-ml-24 w-48 bg-lime-600"
      tooltipTrigger="click"
    >
      <Button
        variant="link"
        onClick={() => {
          navigator.clipboard.writeText(copyText || "");
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default CopyToClipBoardButton;
