import { Exercise } from "@/interfaces/exercise";
import { useRef, useState } from "react";
import InfiniteScroll from "./InfiniteScroll";
import SearchBar from "./SearchBar";
import { exercisesData } from "@/public/data/exercises";
import { useRouter } from "next/router";
import { useRoutineContext } from "@/context/routine/RoutineProvider";
import { useWorkoutContext } from "@/context/workout/WorkoutProvider";

export const AddExercises = ({ workoutMode = false }: { workoutMode?: boolean }) => {
  const allExercises: Exercise[] = exercisesData;
  const [exercises, setExercises] = useState<Exercise[]>(allExercises);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const router = useRouter();

  const { addSelectedExercises } = useRoutineContext();
  const { addExercisesToWorkout } = useWorkoutContext();

  const handleSearch = (query: string) => {
    const filteredExercises = allExercises.filter((exercise) => exercise.name.toLowerCase().includes(query.toLowerCase()));
    setExercises(filteredExercises);
  };

  const handleConfirmSelectedExercises = () => {
    addSelectedExercises(selectedExercises);
    if (workoutMode) addExercisesToWorkout(selectedExercises);
    router.back();
  };

  return (
    <div className={`flex flex-col h-[92vh] overflow-y-scroll overflow-x-hidden`} ref={scrollContainerRef}>
      <SearchBar onSearch={handleSearch} />
      <h1 className="font-bold text-2xl pl-6">All Exercises:</h1>
      <InfiniteScroll exerciseList={exercises} scrollContainerRef={scrollContainerRef} setSelectedExercises={setSelectedExercises} />
      <div className={selectedExercises.length > 0 ? "flex justify-center" : "hidden"}>
        <button
          className="flex fixed bottom-2 gap-2 justify-center items-center w-[80%] p-2 my-2 bg-primary-green hover:bg-[#1f8b60] text-lg rounded-lg font-semibold"
          onClick={handleConfirmSelectedExercises}
        >
          {selectedExercises.length === 1 ? `Add ${selectedExercises.length} exercise` : `Add ${selectedExercises.length} exercises`}
        </button>
      </div>
    </div>
  );
};
