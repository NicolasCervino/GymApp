import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InfiniteScroll from "@/components/InfiniteScroll";
import SearchBar from "@/components/SearchBar";
import withAuth from "@/hocs/withAuth";
import { Exercise } from "@/interfaces/exercise";
import data from "public/data/exercises.json";
import { useRef, useState } from "react";

const Exercises = () => {
  const allExercises: Exercise[] = data;
  const [exercises, setExercises] = useState<Exercise[]>(allExercises);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (query: string) => {
    const filteredExercises = allExercises.filter((exercise) => exercise.name.toLowerCase().includes(query.toLowerCase()));
    setExercises(filteredExercises);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col h-[81vh] bg-[#151515] overflow-scroll" ref={scrollContainerRef}>
        <SearchBar onSearch={handleSearch} />
        <h1 className="font-bold text-2xl pl-6">All Exercises:</h1>
        <InfiniteScroll exerciseList={exercises} scrollContainerRef={scrollContainerRef} />
      </div>
      <Footer />
    </>
  );
};

export default withAuth(Exercises);
