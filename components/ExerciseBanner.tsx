import { Exercise } from "@/interfaces/exercise";
import Image from "next/image";
import React from "react";

const ExerciseBanner = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className="flex items-center gap-4 bg-[#252525] p-5 shadow-xl">
      <Image src={exercise.gif_url} alt="exercise-img" width={80} height={80} className="rounded-full" loading={"lazy"} />
      <div className="flex flex-col">
        <h3 className="font-bold capitalize">{exercise.name}</h3>
        <p className="capitalize">{exercise.body_part}</p>
      </div>
    </div>
  );
};

export default ExerciseBanner;
