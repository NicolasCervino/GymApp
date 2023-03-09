import { ExerciseSet } from "@/interfaces/exerciseSet";
import { RoutineTask } from "@/interfaces/routineTask";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import "react-swipeable-list/dist/styles.css";
import { useRoutineContext } from "@/context/routine/RoutineProvider";
import { FiTrash2 } from "react-icons/fi";
import SetList from "./SetList";

const TaskBanner = ({ task, workoutMode = false }: { task: RoutineTask; workoutMode?: boolean }) => {
  const [sets, setSets] = useState<ExerciseSet[]>(task.sets);
  const { exercise } = task;
  const { removeTask, updateTaskSets } = useRoutineContext();

  useEffect(() => {
    updateTaskSets(task.id, sets); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets]);

  const handleDeleteTask = () => {
    removeTask(task.id);
  };

  const handleAddSet = () => {
    const lastSet = sets[sets.length - 1];
    const newSet: ExerciseSet = {
      kg: lastSet ? lastSet.kg : 0,
      reps: lastSet ? lastSet.reps : 0,
      setNumber: sets.length + 1,
      id: uuid(),
      completed: false,
    };
    setSets([...sets, newSet]);
  };

  return (
    <div className="border w-full flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-900">
        <Image src={exercise.gif_url} alt="exercise-img" width={55} height={55} className="rounded-full" loading={"lazy"} />
        <h3 className="text-[#25ab75] capitalize">{task.exercise.name}</h3>
        <button className="ml-auto" onClick={handleDeleteTask}>
          <FiTrash2 size={18} className="hover:text-red-700" />
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md">
        <div className="w-full bg-gray-900">
          {/* Table header */}
          <div className="w-full flex justify-around text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <div className="px-6 w-[48px] py-4 flex justify-center">Set</div>
            {exercise.equipment !== "body weight" && exercise.equipment !== "band" && (
              <div className="px-6 py-4 w-[48px] flex justify-center">KG</div>
            )}
            <div className="px-6 w-[48px] py-4 flex justify-center">Reps</div>
            {workoutMode && <div className="px-6 w-[48px] py-4 flex justify-center">✓</div>}
          </div>
          {/* Rep list */}
          <div className="w-full">
            <SetList task={task} sets={sets} setSets={setSets} workoutMode={workoutMode} />
          </div>
        </div>
      </div>
      <button
        className="flex gap-2 justify-center items-center w-full p-2 my-2 text-gray-400 bg-gray-900  hover:bg-[#080b12] hover:text-white text-sm font-semibold"
        onClick={handleAddSet}
      >
        <AiOutlinePlus />
        <span>Add Set</span>
      </button>
    </div>
  );
};

export default TaskBanner;
