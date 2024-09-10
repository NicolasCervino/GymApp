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
  // Normalize strings by removing spaces and converting to lowercase
  const normalizeString = (str: string) => str.replace(/\s+/g, '').toLowerCase();

  const handleSearch = (query: string) => {
    const normalizedQuery = normalizeString(query);
    const filteredExercises = allExercises.filter((exercise) => normalizeString(exercise.name).includes(normalizedQuery));
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
