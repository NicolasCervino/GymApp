import { ExerciseSet } from "@/interfaces/exerciseSet";
import { RoutineTask } from "@/interfaces/routineTask";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import { v4 as uuid } from "uuid";
import "react-swipeable-list/dist/styles.css";
import { useRoutineContext } from "@/context/routine/RoutineProvider";
import { FiTrash2 } from "react-icons/fi";

const TaskBanner = ({ task }: { task: RoutineTask }) => {
  const [sets, setSets] = useState<ExerciseSet[]>(task.sets);
  const { exercise } = task;
  const { removeTask, updateTaskSets } = useRoutineContext();

  useEffect(() => {
    updateTaskSets(task.id, sets);
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
    };
    setSets([...sets, newSet]);
  };

  const handleDeleteSet = (setNumber: number) => {
    setSets((prevSets) => {
      const indexToDelete = prevSets.findIndex((set) => set.setNumber === setNumber);
      const newSets = prevSets.filter((_, index) => index !== indexToDelete);
      return newSets.map((set, index) => ({ ...set, setNumber: index + 1 }));
    });
  };

  const trailingActions = ({ setNumber }: { setNumber: number }) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleDeleteSet(setNumber)}>
        <div className="flex justify-center items-center px-6 w-[48px] bg-red-800  border-y-8 border-gray-700">Delete</div>
      </SwipeAction>
    </TrailingActions>
  );

  const handleKgChange = (id: string, newKgCount: number) => {
    setSets((prevSets) =>
      prevSets.map((set) => {
        if (set.id === id) {
          return { ...set, kg: newKgCount };
        }
        return set;
      })
    );
  };

  const handleRepChange = (id: string, newRepCount: number) => {
    setSets((prevSets) =>
      prevSets.map((set) => {
        if (set.id === id) {
          return { ...set, reps: newRepCount };
        }
        return set;
      })
    );
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
            {exercise.equipment !== "body weight" && <div className="px-6 py-4 w-[48px] flex justify-center">KG</div>}
            <div className="px-6 w-[48px] py-4 flex justify-center">Reps</div>
          </div>
          {/* Rep list */}
          <div className="w-full">
            <SwipeableList>
              {sets.map((set) => (
                <SwipeableListItem key={set.id} trailingActions={trailingActions({ setNumber: set.setNumber })}>
                  <div className="w-full h-16 flex items-center justify-center border-x-4 border-y-8 border-gray-700 select-none bg-[#555878]">
                    <div className="w-full flex justify-around items-center">
                      {/* Set number */}
                      <div className="flex justify-center px-6 w-[48px]">{set.setNumber}</div>
                      {/* KG input */}
                      {exercise.equipment !== "body weight" && (
                        <div className="flex justify-center w-[48px] px-6">
                          <input
                            type="number"
                            className="text-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1"
                            required
                            min={0}
                            value={set.kg}
                            onChange={(e) => handleKgChange(set.id, parseInt(e.target.value))}
                          />
                        </div>
                      )}
                      {/* Rep input */}
                      <div className="px-6 w-[48px]">
                        <div className="flex justify-center">
                          <input
                            type="number"
                            className="text-center bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1"
                            required
                            min={0}
                            value={set.reps}
                            onChange={(e) => handleRepChange(set.id, parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwipeableListItem>
              ))}
            </SwipeableList>
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
