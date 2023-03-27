import { Workout } from "@/interfaces/workout";
import { Dispatch, SetStateAction } from "react";
import WorkoutBanner from "./WorkoutBanner";
import { BsArrowRight } from "react-icons/bs";

const SearchResultWorkouts = ({ workouts, setSearchMode }: { workouts: Workout[]; setSearchMode: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className="flex flex-col items-center md:items-start gap-4 m-5 text-white mb-20">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-bold text-2xl self-start">Search results: </h1>
        <button className="text-primary-green flex items-center gap-2" onClick={() => setSearchMode(false)}>
          See all
          <BsArrowRight />
        </button>
      </div>
      {workouts.length === 0 ? (
        <p>There are no search results available...</p>
      ) : (
        <div className="grid grid-row grid-cols-2 gap-4 w-full">
          {workouts.map((workout) => (
            <WorkoutBanner key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultWorkouts;
