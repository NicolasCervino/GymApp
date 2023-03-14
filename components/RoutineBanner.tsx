import { Routine } from "@/interfaces/routine";
import { useSweetAlert } from "@/utils/useSwal";
import Link from "next/link";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

interface RoutineBannerProps {
  routine: Routine;
  removeRoutine: (routineId: string) => Promise<boolean>;
}

function RoutineBanner({ routine, removeRoutine }: RoutineBannerProps) {
  const { showAlert, showingAlert } = useSweetAlert();

  const handleDeleteRoutine = async () => {
    const success = await removeRoutine(routine.id);
    if (success) {
      showAlert("Routine deleted", "info");
    } else {
      showAlert("Failed to delete routine", "error");
    }
  };

  return (
    <div className="bg-[#252525] p-3 flex flex-col justify-between">
      <div className="flex mb-2">
        <h3 className="font-bold text-xl">{routine.name}</h3>
        <button disabled={showingAlert} className="ml-auto" onClick={handleDeleteRoutine}>
          <FiTrash2 size={18} className="hover:text-red-700" />
        </button>
      </div>
      <p className="text-base text-gray-400 capitalize mb-2">
        {routine.tasks
          .slice(0, 3)
          .map((task) => task.exercise.name)
          .join(", ")}
        {routine.tasks.length > 3 && "..."}
      </p>
      <Link
        href={`/workout/${routine.id}`}
        className="w-full text-center p-2 my-2 bg-primary-green hover:bg-[#1f8b60] text-lg font-semibold rounded-lg "
      >
        Start Routine
      </Link>
    </div>
  );
}

export default RoutineBanner;
