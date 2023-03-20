import InfiniteScroll from "@/components/InfiniteScroll";
import SearchBar from "@/components/SearchBar";
import withAuth from "@/hocs/withAuth";
import { Exercise } from "@/interfaces/exercise";
import AppLayout from "@/layout/appLayout";
import { exercisesData } from "@/public/data/exercises";
import { useRef, useState } from "react";

const Exercises = () => {
  const allExercises: Exercise[] = exercisesData;
  const [exercises, setExercises] = useState<Exercise[]>(allExercises);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    const filteredExercises = allExercises.filter((exercise) => exercise.name.toLowerCase().includes(query.toLowerCase()));
    setExercises(filteredExercises);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[85vh] md:h-[92vh] md:ml-28 overflow-y-scroll overflow-x-hidden" ref={scrollContainerRef}>
        <SearchBar onSearch={handleSearch} />
        <h1 className="font-bold text-2xl pl-6">All Exercises:</h1>
        <InfiniteScroll exerciseList={exercises} scrollContainerRef={scrollContainerRef} />
      </div>
    </AppLayout>
  );
};

export default withAuth(Exercises);
