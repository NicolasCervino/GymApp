import { Routine } from "@/interfaces/routine";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

function RoutineBanner({ routine }: { routine: Routine }) {
  const handleDeleteRoutine = () => {};
  return (
    <div className="bg-[#252525] p-3 flex flex-col justify-between">
      <div className="flex mb-2">
        <h3 className="font-bold text-xl">{routine.name}</h3>
        <button className="ml-auto" onClick={handleDeleteRoutine}>
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
      <button className="w-full p-2 my-2 bg-[#25ab75] hover:bg-[#1f8b60] text-lg font-semibold rounded-lg ">Start Routine</button>
    </div>
  );
}

export default RoutineBanner;
