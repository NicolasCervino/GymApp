import { Workout } from "@/interfaces/workout";
import React from "react";
import WorkoutBanner from "./WorkoutBanner";

const AllWorkouts = ({ workouts }: { workouts: Workout[] }) => {
  return (
    <div className="flex flex-col items-center md:items-start gap-4 m-5 text-white mb-20">
      <h1 className="font-bold text-2xl self-start">All Workouts</h1>
      {workouts.length === 0 ? (
        <p>You haven’t worked out yet...</p>
      ) : (
        <div className="grid grid-row grid-cols-2 gap-4 w-full ultrawide:grid-cols-4">
          {workouts.map((workout) => (
            <WorkoutBanner key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllWorkouts;
