import { NewExerciseButton } from "@/components/NewExerciseButton";
import TaskBanner from "@/components/TaskBanner";
import { useWorkoutContext } from "@/context/workout/WorkoutProvider";
import withAuth from "@/hocs/withAuth";
import useRoutines from "@/hooks/useRoutines";
import useTimer from "@/hooks/useTimer";
import { Routine } from "@/interfaces/routine";
import { Workout } from "@/interfaces/workout";
import AppLayout from "@/layout/appLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WorkoutPage = () => {
  const router = useRouter();
  const { routineId } = router.query;
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const [sets, setSets] = useState<number>(0);

  const { currentWorkout, createNewWorkout } = useWorkoutContext();

  const { routines, loading } = useRoutines();

  const { seconds, minutes, hours, totalSeconds } = useTimer(currentWorkout?.startTime || Date.now());

  // Get routine
  useEffect(() => {
    const routine = routines.find((r) => r.id === routineId);
    setRoutine(routine ?? null);
    if (!routine && !loading) router.push("/"); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routines, loading, routineId]);

  // Create new workout
  useEffect(() => {
    if (!currentWorkout && routine) {
      createNewWorkout(routine?.name, routine?.tasks, Date.now());
    }
  }, [createNewWorkout, currentWorkout, routine]);

  // Volume Count
  useEffect(() => {
    let volume = 0;
    let completedSets = getCompletedSets(currentWorkout);
    completedSets
      ?.flat()
      .map((set) => set.kg * set.reps)
      .forEach((number) => (volume += number));
    setVolume(volume);
  }, [currentWorkout]);

  // Set Count
  useEffect(() => {
    let completedSets = getCompletedSets(currentWorkout);
    let completedSetCount = completedSets?.flat().length;
    setSets(completedSetCount || 0);
  }, [currentWorkout]);

  function getCompletedSets(currentWorkout: Workout | null) {
    return currentWorkout?.tasks.map((task) => task.sets.filter((set) => set.completed === true));
  }

  // Format Time
  const elapsedTime = () => {
    let duration = "";
    if (hours > 0) {
      return (duration = `${hours}h ${minutes}m ${seconds}s`);
    } else if (minutes > 0) {
      return (duration = `${minutes}m ${seconds}s`);
    } else {
      return (duration = `${seconds}s`);
    }
  };

  return (
    <AppLayout>
      <div className="h-[85vh] md:px-20 md:h-[92vh] overflow-x-hidden px-6 py-5 text-white">
        <div className="flex gap-4 border-b pb-2">
          <div className="flex flex-col">
            <span className="text-gray-300 font-light">Duration</span>
            {elapsedTime()}
          </div>
          <div className="flex flex-col">
            <span className="text-gray-300 font-light">Volume</span>
            {volume}kg
          </div>
          <div className="flex flex-col">
            <span className="text-gray-300 font-light">Sets</span>
            {sets}
          </div>
        </div>
        <div className="flex flex-col items-center mt-5 px-2 gap-3 lg:mx-14">
          {loading ? (
            <div>Loading...</div>
          ) : (
            currentWorkout?.tasks.map((task) => <TaskBanner key={task.id} task={task} workoutMode={true} />)
          )}
          <NewExerciseButton route={`/workout/${routineId}/add-exercise`} />
        </div>
      </div>
    </AppLayout>
  );
};
export default withAuth(WorkoutPage);
