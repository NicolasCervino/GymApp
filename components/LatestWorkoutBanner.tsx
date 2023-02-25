import background from "../public/workout-backdrop.jpg";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useState } from "react";

const LatestWorkoutBanner = () => {
  // Just a test, this needs to come from user
  const [workoutStatus, setWorkoutStatus] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center md:items-start gap-4 m-5 text-white">
      <h1 className="font-bold text-2xl self-start">Today’s Session</h1>
      {workoutStatus ? (
        <p>You haven’t worked out yet today...</p>
      ) : (
        //   Placeholder data for now
        <div
          className="bg-cover bg-center w-full h-40 xl:w-[50vw] md:h-[50vh] rounded-2xl relative bg-[#0007] bg-blend-darken"
          style={{ backgroundImage: `url(${background.src})` }}
        >
          <div className="flex flex-col absolute bottom-4 left-4">
            <h3 className="font-bold text-2xl">Full Body</h3>
            <span className="font-extralight text-lg">34 Tasks</span>
            <span className="font-extralight text-lg flex items-center gap-1">
              <AiOutlineClockCircle />
              24 min
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestWorkoutBanner;
