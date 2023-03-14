import { Workout } from "@/interfaces/workout";
import WorkoutBanner from "./WorkoutBanner";

const LatestWorkout = ({ workout }: { workout: Workout | null }) => {
  return (
    <div className="flex flex-col items-center md:items-start gap-4 m-5 text-white">
      <h1 className="font-bold text-2xl self-start">Today’s Session</h1>
      {!workout ? (
        <p>You haven’t worked out yet today...</p>
      ) : (
        <div className="grid grid-row md:grid-cols-2 gap-4 w-full">
          <WorkoutBanner workout={workout!} />
        </div>
      )}
    </div>
  );
};

export default LatestWorkout;
