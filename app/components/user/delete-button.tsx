import { TrashIcon } from "@heroicons/react/24/outline";
import type { FetcherWithComponents } from "@remix-run/react";
import type { FC } from "react";
import Button from "../common/button";

interface DeleteRecommendationButtonProps {
  id?: string;
  fetcher: FetcherWithComponents<any>;
  deleteInProgress?: boolean;
}

const DeleteRecommendationButton: FC<DeleteRecommendationButtonProps> = ({
  id,
  fetcher,
  deleteInProgress,
}) => {
  return (
    <fetcher.Form method="delete" className="flex h-full">
      <input type="hidden" value={id} name="recommendationId" />
      <Button
        variant="link"
        className="h-full bg-white md:px-1 md:py-1"
        type="submit"
        disabled={fetcher.state === "submitting" || fetcher.state === "loading"}
      >
        <TrashIcon className="white h-4 w-4" />
      </Button>
    </fetcher.Form>
  );
};

export default DeleteRecommendationButton;
