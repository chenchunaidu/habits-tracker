import Button from "~/components/common/button";
import NavFloater from "~/components/habits/nav-floater";
import HomeContainer from "~/components/home/home-container";

const tasks = [
  {
    background: "bg-lime-200",
    id: 1,
    title: "Easy school",
    description:
      "Easy school is a learning app for simplifying the teacher parent communication and empower parent to teach their kids easily",
    subtasks: [
      {
        id: 1,
        title: "AWS Lambda architecture",
        description: "AWS Lambda architecture for easy school",
      },
      {
        id: 2,
        title: "Planet scale setup",
        description: "Setup planet scale for backend",
      },
    ],
  },
  {
    background: "bg-violet-200",
    id: 1,
    title: "Easy school",
    description:
      "Easy school is a learning app for simplifying the teacher parent communication and empower parent to teach their kids easily",
    subtasks: [
      {
        id: 1,
        title: "AWS Lambda architecture",
        description: "AWS Lambda architecture for easy school",
      },
      {
        id: 2,
        title: "Planet scale setup",
        description: "Setup planet scale for backend",
      },
    ],
  },
  {
    background: "bg-orange-200",
    id: 1,
    title: "Easy school",
    description:
      "Easy school is a learning app for simplifying the teacher parent communication and empower parent to teach their kids easily",
    subtasks: [
      {
        id: 1,
        title: "AWS Lambda architecture",
        description: "AWS Lambda architecture for easy school",
      },
      {
        id: 2,
        title: "Planet scale setup",
        description: "Setup planet scale for backend",
      },
    ],
  },
];

export default function Homepage() {
  return (
    <HomeContainer header="Tasks" addLink="/home/tasks/new">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`rounder-md space-y-2 rounded-md bg-lime-300 py-8 px-4 text-stone-600 shadow-md`}
        >
          <div className="flex justify-between">
            <div className="text-lg font-semibold text-stone-700">
              {task.title}
            </div>
            <Button variant="ghost" size="sm">
              Add subtask
            </Button>
          </div>
          <div>{task.description}</div>
          {task.subtasks.map((subtask) => {
            return (
              <div
                key={subtask.id}
                className="flex items-start space-x-4 rounded-md bg-white p-4 text-stone-700"
              >
                <div className="space-y-2">
                  <div>
                    <div className="font-semibold">{subtask.title}</div>
                    <div>{subtask.description}</div>
                  </div>
                  <Button size="sm">Complete</Button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <NavFloater />
    </HomeContainer>
  );
}
