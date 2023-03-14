import { ExerciseSet } from "@/interfaces/exerciseSet";
import { RoutineTask } from "@/interfaces/routineTask";
import { weightEquipment } from "@/public/data/exercises";
import React from "react";
import { SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";

interface SetListProps {
  task: RoutineTask;
  sets: ExerciseSet[];
  setSets: React.Dispatch<React.SetStateAction<ExerciseSet[]>>;
  workoutMode: boolean;
}

const SetList = ({ task, sets, setSets, workoutMode }: SetListProps) => {
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

  const handleCheck = (setId: string) => {
    setSets((prevSets) => prevSets.map((set) => (set.id === setId ? { ...set, completed: !set.completed } : set)));
  };

  return (
    <SwipeableList>
      {sets.map((set) => (
        <SwipeableListItem key={set.id} trailingActions={trailingActions({ setNumber: set.setNumber })}>
          <div
            className={`w-full h-16 flex items-center justify-center border-x-4 border-y-8 border-gray-700 select-none ${
              set.completed ? "bg-[#25ab75]" : "bg-[#555878]"
            }`}
          >
            <div className="w-full flex justify-around items-center">
              {/* Set number */}
              <div className="flex justify-center px-6 w-[48px]">{set.setNumber}</div>
              {/* KG input */}
              {weightEquipment.includes(task.exercise.equipment) && (
                <div className="flex justify-center w-[48px] px-6">
                  <input
                    type="number"
                    className={`text-center w-14 ${set.completed ? "bg-inherit" : "bg-gray-700"}
                       text-sm rounded-lg block px-2.5 py-1 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="1"
                    required
                    min={0}
                    defaultValue={set.kg || 0}
                    onChange={(e) => handleKgChange(set.id, parseInt(e.target.value))}
                  />
                </div>
              )}
              {/* Rep input */}
              <div className="px-6 w-[48px]">
                <div className="flex justify-center">
                  <input
                    type="number"
                    className={`text-center w-14 ${set.completed ? "bg-inherit" : "bg-gray-700"} 
                      text-sm rounded-lg block px-2.5 py-1 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="1"
                    required
                    min={0}
                    defaultValue={set.reps || 0}
                    onChange={(e) => handleRepChange(set.id, parseInt(e.target.value))}
                  />
                </div>
              </div>
              {/* Check input */}
              {workoutMode && (
                <div className="px-6 w-[48px]">
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className={`text-center w-14 ${set.completed ? "bg-inherit" : "bg-gray-700"}
                         text-sm rounded-lg block px-2.5 py-1 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
                      checked={set.completed || false}
                      onChange={() => handleCheck(set.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </SwipeableListItem>
      ))}
    </SwipeableList>
  );
};

export default SetList;
