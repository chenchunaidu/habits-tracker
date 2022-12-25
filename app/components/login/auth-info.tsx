import Heading from "~/components/common/heading";

export default function AuthInfo() {
  return (
    <div className="flex flex-col justify-center  space-y-12">
      <Heading className="drop-shadow-solid-md hover:drop-shadow-solid-lg  font-light text-lime-100 md:text-7xl">
        Track your <div className="font-bold">Habits</div> Easily now with
        <div className="font-bold"> Recomnd</div>
      </Heading>
    </div>
  );
}
