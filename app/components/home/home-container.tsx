import { Link } from "@remix-run/react";
import Button from "~/components/common/button";
import Container from "~/components/common/container";
import Heading from "~/components/common/heading";
import { PlusIcon } from "@heroicons/react/24/solid";
import NavFloater from "~/components/habits/nav-floater";
import type { FC, ReactNode } from "react";

interface HomeContainerProps {
  header: string;
  addLink: string;
  children: ReactNode;
}

const HomeContainer: FC<HomeContainerProps> = ({
  header,
  addLink,
  children,
}) => {
  return (
    <Container className="space-y-4 overflow-scroll">
      <div className="flex items-center justify-between">
        <Heading order="4" className="md:text-lg">
          {header}
        </Heading>
        <Link to={addLink}>
          <Button variant="link">
            <PlusIcon className="h-6 w-6"></PlusIcon>
          </Button>
        </Link>
      </div>
      {children}
      <NavFloater />
    </Container>
  );
};

export default HomeContainer;
