import { NewspaperIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../common/button";
import Text from "../common/text";
import type { CardProps } from "./card";
import Card from "./card";

interface CardsProps {
  cards: CardProps[];
  showEmptyCardsMsg?: boolean;
  isAdmin?: boolean;
}

const Cards: FC<CardsProps> = ({ cards, showEmptyCardsMsg, isAdmin }) => {
  if (!cards?.length) {
    if (showEmptyCardsMsg) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
          <NewspaperIcon className="h-32 w-32 font-thin text-gray-700"></NewspaperIcon>
          <Text>Fill up this space with your recommendations</Text>
          <Link to="/home/recommendations/new">
            <Button>Add your first recommendation</Button>
          </Link>
        </div>
      );
    }
    return <div></div>;
  }
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-6 md:grid-cols-3 md:gap-x-3 md:gap-y-5 lg:grid-cols-4 lg:gap-x-6  lg:gap-y-8">
      {cards?.map((card) => (
        <Card key={card.id} {...card} isAdmin={isAdmin} />
      ))}
    </div>
  );
};

export default Cards;
export type { CardsProps };
