import { Exercise } from "@/interfaces/exercise";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ExerciseBannerProps {
  exercise: Exercise;
  setSelectedExercises?: Dispatch<SetStateAction<Exercise[]>>;
}

const ExerciseBanner = ({ exercise, setSelectedExercises }: ExerciseBannerProps) => {
  const [addExerciseMode, setAddExerciseMode] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setAddExerciseMode(router.asPath.includes("/add-exercise"));
  }, [router.asPath]);

  const handleBannerClick = () => {
    if (addExerciseMode) {
      handleSelectExercise();
    } else {
      router.push(`/exercises/${exercise.id}`);
    }
  };

  const handleSelectExercise = () => {
    if (setSelectedExercises) {
      setIsSelected(!isSelected);
      // Call the function to add or remove the exercise from the selectedExercises array
      if (!isSelected) {
        setSelectedExercises((prevSelectedExercises) => [...prevSelectedExercises, exercise]);
      } else {
        setSelectedExercises((prevSelectedExercises) =>
          prevSelectedExercises.filter((selectedExercise) => selectedExercise.id !== exercise.id)
        );
      }
    }
  };

  return (
    <div
      className={`flex items-center gap-4 bg-[#252525] p-5 shadow-xl ${isSelected ? "border-l-4 border-[#25ab75]" : ""}`}
      onClick={handleBannerClick}
    >
      <Image src={exercise.gif_url} alt="exercise-img" width={80} height={80} className="rounded-full" loading={"lazy"} />
      <div className="flex flex-col">
        <h3 className="font-bold capitalize">{exercise.name}</h3>
        <p className="capitalize">{exercise.body_part}</p>
      </div>
    </div>
  );
};

export default ExerciseBanner;
