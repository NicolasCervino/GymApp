import { useWorkoutContext } from "@/context/workout/WorkoutProvider";
import useRoutines from "@/hooks/useRoutines";
import { Routine } from "@/interfaces/routine";
import { useSweetAlert } from "@/utils/useSwal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

export const WorkoutHeader = () => {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const router = useRouter();
  const { routineId } = router.query;
  const { routines } = useRoutines();

  const { showAlert, showingAlert } = useSweetAlert();

  const { currentWorkout, setCurrentWorkout, saveWorkout } = useWorkoutContext();

  useEffect(() => {
    const routine = routines.find((r) => r.id === routineId);
    setRoutine(routine ?? null);
  }, [routines, routineId]);

  const handleBackButton = () => {
    if (router.asPath.includes("/add-exercise")) {
      router.back();
    } else {
      setCurrentWorkout(null);
      router.back();
    }
  };

  const handleFinishWorkout = async () => {
    if (currentWorkout) {
      const success = await saveWorkout();
      if (success) {
        showAlert("Workout saved", "success", () => {
          setCurrentWorkout(null);
          router.back();
        });
      } else {
        showAlert("Failed to save workout", "error");
      }
    } else {
      showAlert("Workout is null", "error");
    }
  };

  return (
    <div className="bg-[#151515] min-h-[8vh] flex items-center justify-between px-4 text-white">
      <button disabled={showingAlert} className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleBackButton}>
        <AiOutlineLeft className="w-5 h-5" />
      </button>
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-xl font-bold">{routine?.name}</h1>
      </div>
      {/* Finish button */}
      <button disabled={showingAlert} className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleFinishWorkout}>
        <BsCheck2 className="w-5 h-5" />
      </button>
    </div>
  );
};
