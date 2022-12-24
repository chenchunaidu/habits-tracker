import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Button from "~/components/common/button";
import Container from "~/components/common/container";
import Heading from "~/components/common/heading";
import Cards from "~/components/user/cards";
import { requiredUser } from "~/lib/auth/auth";
import {
  deleteRecommendation,
  getRecommendationsByUserId,
} from "~/models/recommendation.server";
import { PlusIcon, ShareIcon } from "@heroicons/react/24/solid";
import CopyToClipBoardButton from "~/components/common/copy-to-clipboard";

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

  const goals = [
    {
      id: 1,
      title: "Weight loss",
      description:
        " Even a modest weight loss of 5% to 10% of your total body weight is likely to produce health benefits, such as improvements in blood pressure, blood cholesterol, and blood sugars.",
      endDate: "",
      habits: [
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
      ],
    },
    {
      id: 1,
      title: "Easy school",
      description:
        " Even a modest weight loss of 5% to 10% of your total body weight is likely to produce health benefits, such as improvements in blood pressure, blood cholesterol, and blood sugars.",
      endDate: "",
      habits: [
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
      ],
    },
  ];

  return (
    <Container className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading order="4" className="md:text-lg">
          Goals
        </Heading>
      </div>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="space-y-2 rounded-md bg-white p-4 shadow-md"
          >
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-lime-500">
                {goal.title}
              </div>
              <Link to="/home/recommendations/new">
                <Button variant="link">
                  <PlusIcon className="h-6 w-6"></PlusIcon>
                </Button>
              </Link>
            </div>
            <div>{goal.description}</div>
            <div className="h-3 w-full rounded-md bg-gray-300">
              <div className="h-full w-3/4 rounded-md bg-gradient-to-r from-lime-300 to-lime-400"></div>
            </div>

            <div className="space-y-2">
              {goal.habits.map((habit) => (
                <div
                  key={habit.id}
                  className="flex items-center space-x-4 rounded-md  bg-gradient-to-r from-lime-300 to-lime-400 p-4 shadow-sm"
                >
                  <input type="checkbox" className="h-6 w-6"></input>
                  <img
                    src={habit.image}
                    alt="habit.title"
                    className="h-9 w-9 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-semibold">{habit.title}</div>
                    <div>{habit.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
