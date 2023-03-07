import InfiniteScroll from "@/components/InfiniteScroll";
import SearchBar from "@/components/SearchBar";
import { useRoutineContext } from "@/context/routine/RoutineProvider";
import withAuth from "@/hocs/withAuth";
import { Exercise } from "@/interfaces/exercise";
import { Routine } from "@/interfaces/routine";
import { RoutineTask } from "@/interfaces/routineTask";
import AppLayout from "@/layout/appLayout";
import { useRouter } from "next/router";
import data from "public/data/exercises.json";
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const AddExercises = () => {
  const allExercises: Exercise[] = data;
  const [exercises, setExercises] = useState<Exercise[]>(allExercises);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const router = useRouter();

  const { addSelectedExercises } = useRoutineContext();

  const handleSearch = (query: string) => {
    const filteredExercises = allExercises.filter((exercise) => exercise.name.toLowerCase().includes(query.toLowerCase()));
    setExercises(filteredExercises);
  };

  const handleConfirmSelectedExercises = () => {
    addSelectedExercises(selectedExercises);
    router.back();
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[85vh] md:h-[92vh] overflow-y-scroll overflow-x-hidden" ref={scrollContainerRef}>
        <SearchBar onSearch={handleSearch} />
        <h1 className="font-bold text-2xl pl-6">All Exercises:</h1>
        <InfiniteScroll exerciseList={exercises} scrollContainerRef={scrollContainerRef} setSelectedExercises={setSelectedExercises} />
        <div className={selectedExercises.length > 0 ? "flex justify-center" : "hidden"}>
          <button
            className="flex fixed bottom-2 gap-2 justify-center items-center w-[80%] p-2 my-2 bg-[#25ab75] hover:bg-[#1f8b60] text-lg rounded-lg font-semibold"
            onClick={handleConfirmSelectedExercises}
          >
            {selectedExercises.length === 1 ? `Add ${selectedExercises.length} exercise` : `Add ${selectedExercises.length} exercises`}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default withAuth(AddExercises);
