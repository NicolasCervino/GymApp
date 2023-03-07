import { useRoutineContext } from "@/context/routine/RoutineProvider";
import { useSweetAlert } from "@/utils/useSwal";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineSave } from "react-icons/ai";

const RoutineHeader = () => {
  const [addExerciseMode, setAddExerciseMode] = useState<boolean>(false);
  const router = useRouter();
  const { newRoutine, setNewRoutine, saveNewRoutine } = useRoutineContext();
  const { showAlert, showingAlert } = useSweetAlert();

  useEffect(() => {
    setAddExerciseMode(router.asPath.includes("/add-exercise"));
  }, [router.asPath]);

  const handleSaveRoutine = async () => {
    if (newRoutine && newRoutine.name && newRoutine.tasks.length > 0) {
      const success = await saveNewRoutine();
      if (success) {
        showAlert("Routine saved", "success", () => {
          setNewRoutine(null);
          router.back();
        });
      } else {
        showAlert("Failed to save routine", "error");
      }
    } else {
      showAlert("Routine must have at least 1 task and a name", "error");
    }
  };

  const handleBackButton = () => {
    if (router.asPath.includes("/add-exercise")) {
      router.back();
    } else {
      setNewRoutine(null);
      router.back();
    }
  };

  return (
    <div className="bg-[#151515] min-h-[8vh] flex items-center justify-between px-4 text-white">
      <button disabled={showingAlert} className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleBackButton}>
        <AiOutlineLeft className="w-5 h-5" />
      </button>
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-xl font-bold">{addExerciseMode ? "Add Exercise" : "Create Routine"}</h1>
      </div>
      {/* Save button */}
      {!addExerciseMode && (
        <button disabled={showingAlert} className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleSaveRoutine}>
          <AiOutlineSave className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default RoutineHeader;
