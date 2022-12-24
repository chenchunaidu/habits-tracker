import type { Recommendations } from "~/models/recommendation.server";
import type { FC } from "react";
import { Link, useFetcher } from "@remix-run/react";
import DeleteRecommendationButton from "./delete-button";
import { PencilIcon } from "@heroicons/react/24/outline";
import Button from "../common/button";

interface CardProps extends Recommendations {
  isAdmin?: boolean;
}

const Card: FC<CardProps> = (recommendation) => {
  const fallback = !recommendation.media;
  const deleteCard = useFetcher();
  const deleteInProgress =
    deleteCard.state === "submitting" || deleteCard.state === "loading";

  return (
    <div
      key={recommendation.id}
      className={` group relative aspect-video w-full  delay-200  duration-1000 ease-in-out md:aspect-[4/3] md:w-auto    ${
        deleteInProgress ? "grayscale" : ""
      }`}
    >
      <div className="h-full w-full overflow-hidden">
        <a href={recommendation.url} target="_blank" rel="noreferrer">
          {fallback ? (
            <div className="h-full rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600"></div>
          ) : (
            <img
              src={recommendation.media}
              alt={recommendation.title}
              height="100%"
              width="100%"
              className="h-full rounded-md object-cover object-top transition delay-150 duration-500 ease-in-out md:group-hover:scale-110"
            />
          )}
          {!recommendation.title && !recommendation.description ? (
            <div className="absolute top-1/4 break-all p-4 text-xs text-gray-50 line-clamp-2">
              {recommendation.url}
            </div>
          ) : (
            <div
              className={`absolute bottom-0 w-full rounded-md bg-gradient-to-b from-transparent to-black px-2 pb-2 pt-16`}
            >
              <div className="text-sm font-bold text-white line-clamp-2">
                {recommendation.title}
              </div>
              <div className="text-xs text-white text-opacity-60 line-clamp-6">
                {recommendation.description}
              </div>
            </div>
          )}
        </a>
        {recommendation?.isAdmin &&
        recommendation.scrapStatus !== "inprogress" ? (
          <div className="absolute top-2 right-2 flex space-x-2 transition  delay-150 ease-in-out group-hover:flex md:hidden">
            <DeleteRecommendationButton
              id={recommendation.id}
              fetcher={deleteCard}
              deleteInProgress={deleteInProgress}
            />
            <Link to={`/home/recommendations/${recommendation.id}/edit`}>
              <Button variant="link" className="bg-white md:px-1 md:py-1">
                <PencilIcon className="white h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Card;
export type { CardProps };
