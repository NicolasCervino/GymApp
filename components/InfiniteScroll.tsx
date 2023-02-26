import { Exercise } from "@/interfaces/exercise";
import { Dispatch, RefObject, SetStateAction, useEffect, useState } from "react";
import ExerciseBanner from "./ExerciseBanner";

interface InfiniteScrollProps {
  exerciseList: Exercise[];
  scrollContainerRef: RefObject<HTMLDivElement>;
  setSelectedExercises?: Dispatch<SetStateAction<Exercise[]>>;
}

const InfiniteScroll = ({ exerciseList, scrollContainerRef, setSelectedExercises }: InfiniteScrollProps) => {
  const [showingExercises, setShowingExercises] = useState<Exercise[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showFirst20Posts = () => {
      if (exerciseList.length >= 20) {
        setShowingExercises(exerciseList.slice(0, 20));
        setIndex(20);
      } else {
        setShowingExercises(exerciseList);
        setIndex(exerciseList.length);
      }
    };
    showFirst20Posts();
  }, [exerciseList]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const showMorePosts = () => {
      if (index + 20 < exerciseList.length) {
        const newExercises = exerciseList.slice(index, index + 20);
        setShowingExercises(showingExercises.concat(newExercises));
        setIndex(index + 20);
      } else if (exerciseList.length !== index) {
        const newExercises = exerciseList.slice(index, index + 1);
        setShowingExercises(showingExercises.concat(newExercises));
        setIndex(index + 1);
      }
    };

    const handleScroll = ({ target }: any) => {
      if (target.scrollHeight - Math.ceil(target.scrollTop) <= target.clientHeight) {
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
    <div className="grid grid-row md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {showingExercises.map((exercise) => (
        <ExerciseBanner key={exercise.id} exercise={exercise} setSelectedExercises={setSelectedExercises} />
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center flex-grow">
      <p className="text-xl font-semibold">No exercises found..</p>
    </div>
  );
};

export default InfiniteScroll;
