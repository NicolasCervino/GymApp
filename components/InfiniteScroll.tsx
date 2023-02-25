import { Exercise } from "@/interfaces/exercise";
import { RefObject, useEffect, useState } from "react";
import ExerciseBanner from "./ExerciseBanner";

interface InfiniteScrollProps {
  exerciseList: Exercise[];
  scrollContainerRef: RefObject<HTMLDivElement>;
}

const InfiniteScroll = ({ exerciseList, scrollContainerRef }: InfiniteScrollProps) => {
  const [showingExercises, setShowingExercises] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showFirst5Posts = () => {
      if (exerciseList.length >= 5) {
        setShowingExercises(exerciseList.slice(0, 5));
        setIndex(5);
      } else {
        setShowingExercises(exerciseList);
        setIndex(exerciseList.length);
      }
    };
    showFirst5Posts();
  }, [exerciseList]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const showMorePosts = () => {
      if (index + 5 < exerciseList.length) {
        const newExercises = exerciseList.slice(index, index + 5);
        setShowingExercises(showingExercises.concat(newExercises));
        setIndex(index + 5);
      } else if (exerciseList.length !== index) {
        const newExercises = exerciseList.slice(index, index + 1);
        setShowingExercises(showingExercises.concat(newExercises));
        setIndex(index + 1);
      }
    };

    const handleScroll = ({ target }: any) => {
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        showMorePosts();
      }
    };
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);

      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  });

  return exerciseList.length > 0 ? (
    <div className="w-full p-6 outline-none flex flex-col gap-4 py-8 flex-grow">
      {showingExercises.map((exercise) => (
        <ExerciseBanner key={exercise.id} exercise={exercise} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center flex-grow">
      <p className="text-xl font-semibold">No exercises found..</p>
    </div>
  );
};

export default InfiniteScroll;
