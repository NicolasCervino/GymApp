import { useWorkoutContext } from "@/context/workout/WorkoutProvider";
import useRoutines from "@/hooks/useRoutines";
import { Routine } from "@/interfaces/routine";
import { defaultRoutines } from "@/public/data/defaultRoutines";
import { useSweetAlert } from "@/utils/useSwal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";

export const WorkoutHeader = () => {
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [addExerciseMode, setAddExerciseMode] = useState<boolean>(false);
  const router = useRouter();
  const { routineId } = router.query;
  const { routines } = useRoutines();

  const { showAlert, showingAlert } = useSweetAlert();

  const { currentWorkout, setCurrentWorkout, saveWorkout } = useWorkoutContext();

  useEffect(() => {
    setAddExerciseMode(router.asPath.includes("/add-exercise"));
  }, [router.asPath]);

  useEffect(() => {
    const routine = routines.find((r) => r.id === routineId) || defaultRoutines.find((r) => r.id === routineId);
    setRoutine(routine ?? null);
  }, [routines, routineId]);

  const handleBackButton = () => {
    if (router.asPath.includes("/add-exercise")) {
      router.back();
    } else {
      setCurrentWorkout(null);
      localStorage.removeItem("startTime");
      router.push("/profile");
    }
  };

  // The current workout has at least one task with a completed set
  const hasCompletedSet = currentWorkout?.tasks.some((task) => {
    return task.sets.some((set) => {
      return set.completed;
    });
  });

  const handleFinishWorkout = async () => {
    if (currentWorkout && hasCompletedSet) {
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
      showAlert("Workout should have at least 1 task and 1 set", "error");
    }
  };

  return (
    <div className="bg-[#151515] min-h-[8vh] flex items-center justify-between px-4 text-white py-2">
      <button disabled={showingAlert} className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleBackButton}>
        <AiOutlineLeft className="w-5 h-5" />
      </button>
      <div className={`flex-1 flex items-center justify-center ${addExerciseMode ? "mr-5" : ""}`}>
        <h1 className="text-xl font-bold text-center">{routine?.name}</h1>
      </div>
      {/* Finish button */}
      {!addExerciseMode && (
        <button disabled={showingAlert} className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleFinishWorkout}>
          <BsCheck2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
