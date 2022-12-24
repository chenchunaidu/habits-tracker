import Heading from "~/components/common/heading";

export default function AuthInfo() {
  return (
    <div className="flex justify-center flex-col  space-y-12">
      <Heading className="md:text-7xl text-violet-100  drop-shadow-solid-md hover:drop-shadow-solid-lg font-light">
        Share your <div className="font-bold">Favorite Things</div> with your
        <div className="font-bold"> Favorite People</div>
      </Heading>
    </div>
  );
}
