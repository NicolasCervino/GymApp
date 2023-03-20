import withAuth from "@/hocs/withAuth";
import usePersonalRecords from "@/hooks/usePersonalRecords";
import { Exercise } from "@/interfaces/exercise";
import AppLayout from "@/layout/appLayout";
import { exercisesData } from "@/public/data/exercises";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiDumbbell } from "react-icons/bi";
import { GiBiceps } from "react-icons/gi";

const ExercisePage = () => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const router = useRouter();
  const { exerciseId } = router.query;

  // Get exercise
  useEffect(() => {
    const exercise = exercisesData.find((e) => e.id === exerciseId);
    setExercise(exercise ?? null);
    if (!exercise) router.push("/"); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercisesData, exerciseId]);

  const { personalRecord, loading } = usePersonalRecords(exerciseId ?? undefined);

  return (
    <AppLayout>
      <div className="md:ml-28 h-[85vh] md:h-[92vh] overflow-x-hidden text-white">
        {exercise && (
          <div className="p-6 h-full">
            {/* Exercise Info */}
            <div className="flex flex-col">
              <h1 className="capitalize text-xl font-bold">{exercise?.name}</h1>
              <div className="flex gap-4 mt-4 w-full md:h-40">
                <div className="w-1/2 rounded-lg overflow-hidden flex bg-white">
                  <Image
                    src={exercise.gif_url}
                    alt="exercise-img"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    loading={"lazy"}
                  />
                </div>
                <div className="flex flex-col w-full h-full justify-evenly">
                  <p className="text-[#9b9b9b]">Info</p>
                  <div className="flex items-center gap-2">
                    <BiDumbbell className="w-7 h-7" />
                    <p className="capitalize">Equimpment: {exercise.equipment}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <GiBiceps className="w-7 h-7" />
                    <p className="capitalize">Muscle Target: {exercise.target}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <GiBiceps className="w-7 h-7" />
                    <p className="capitalize">Body Part: {exercise.body_part}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Statistics</h2>
            </div>
            <div className="">
              <div className="pt-4">
                <p>Heaviest Weight</p>
                <h2 className="text-lg font-bold">
                  {loading ? "...kg" : personalRecord ? `${personalRecord.highest_weight}kg` : "No Data Yet..."}
                </h2>
              </div>
              <div className="pt-4">
                <p>One Rep Max</p>
                <h2 className="text-lg font-bold">
                  {loading ? "...kg" : personalRecord ? `${personalRecord.one_rep_max}kg` : "No Data Yet..."}
                </h2>
              </div>
              <div className="pt-4">
                <p>Best Set Volume</p>
                <h2 className="text-lg font-bold">
                  {loading
                    ? "...kg"
                    : personalRecord
                    ? `${personalRecord.best_set_volume.kg}kg x ${personalRecord.best_set_volume.reps} (${
                        personalRecord.best_set_volume.kg * personalRecord.best_set_volume.reps
                      }kg)`
                    : "No Data Yet..."}
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default withAuth(ExercisePage);
