import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/common/button";
import Container from "~/components/common/container";
import Heading from "~/components/common/heading";
import { requiredUser } from "~/lib/auth/auth";
import {
  deleteRecommendation,
  getRecommendationsByUserId,
} from "~/models/recommendation.server";
import { PlusIcon } from "@heroicons/react/24/solid";
import Habit from "~/components/habits/habit";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requiredUser(request);
  const data = await getRecommendationsByUserId(user.id);
  return { recommendations: data, user };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await requiredUser(request);
  let formData = await request.formData();
  let recommendationId = formData.get("recommendationId");
  if (recommendationId && typeof recommendationId === "string") {
    await deleteRecommendation(user.id, recommendationId);
  }
  return { recommendationId };
};

export default function Homepage() {
  const { recommendations, user } = useLoaderData();
  const location =
    typeof window !== "undefined" ? window?.location?.origin : "";

  const habits = [
    {
      id: 1,
      title: "Walking",
      description: "Walk for 30 mins",
      image:
        "https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZXhlcmNpc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 1,
      title: "Gym",
      description: "Go to gym for 30min",
      image:
        "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      id: 2,
      title: "Meditation",
      description: "Do meditation for 25min",
      image:
        "https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2938&q=80",
    },
    {
      id: 3,
      title: "Read a book",
      description: "Read book 10 pages",
      image:
        "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      completed: true,
    },
  ];

  return (
    <Container className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading order="4" className="md:text-lg">
          Habits
        </Heading>
        <Link to="/home/habits/new">
          <Button variant="link">
            <PlusIcon className="h-6 w-6"></PlusIcon>
          </Button>
        </Link>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-slate-700">
          Completed <span className="font-semibold text-black">10/15</span>{" "}
          tasks
        </div>
        <div className="h-3 w-full rounded-md bg-gray-300">
          <div className="h-full w-3/4 rounded-md bg-gradient-to-r from-lime-300 to-lime-400"></div>
        </div>
      </div>
      <div className="space-y-2">
        {habits.map(({ id, description, title, image, completed }) => (
          <Habit
            description={description}
            title={title}
            image={image}
            id={id}
            key={id}
            completed={completed}
          />
        ))}
      </div>
    </Container>
  );
}
