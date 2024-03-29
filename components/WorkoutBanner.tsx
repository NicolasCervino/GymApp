import { Workout } from "@/interfaces/workout";
import { AiOutlineClockCircle } from "react-icons/ai";

const WorkoutBanner = ({ workout }: { workout: Workout }) => {
  const hours = workout ? Math.floor(workout.duration / 3600000) : 0;
  const minutes = workout ? Math.floor((workout.duration % 3600000) / 60000) : 0;

  return (
    <div
      className="bg-cover bg-center w-full h-44 lg:h-72 rounded-2xl bg-[#0007] bg-blend-darken shadow-lg flex flex-col items-start justify-end p-3"
      style={{ backgroundImage: `url(${workout.image_url})` }}
    >
      <div className="flex flex-col">
        <h3 className="font-bold text-xl md:text-2xl">{workout.name}</h3>
        <span className="font-extralight text-base">{workout.tasks.length === 1 ? "1 Task" : `${workout.tasks.length} Tasks`}</span>
        <span className="font-extralight text-base flex items-center gap-1">
          <AiOutlineClockCircle />
          {hours > 0 && `${hours} h`} {minutes} min
        </span>
      </div>
    </div>
  );
};

export default WorkoutBanner;
