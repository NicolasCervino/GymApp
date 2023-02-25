import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineSave } from "react-icons/ai";

const RoutineHeader = () => {
  const [addExerciseMode, setAddExerciseMode] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setAddExerciseMode(router.asPath.includes("/add-exercise"));
  }, [router.asPath]);

  const handleSaveRoutine = () => {
    console.log("test");
  };

  return (
    <div className="bg-[#151515] min-h-[8vh] flex items-center justify-between px-4 text-white">
      <button className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={router.back}>
        <AiOutlineLeft className="w-5 h-5" />
      </button>
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-xl font-bold">{addExerciseMode ? "Add Exercise" : "Create Routine"}</h1>
      </div>
      {/* Save button */}
      {!addExerciseMode && (
        <button className="border-white border-2 p-2 rounded-lg hover:bg-slate-500" onClick={handleSaveRoutine}>
          <AiOutlineSave className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default RoutineHeader;
