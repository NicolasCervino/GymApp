import { Exercise } from "@/interfaces/exercise";
import { ExerciseSet } from "@/interfaces/exerciseSet";
import { Routine } from "@/interfaces/routine";
import { createContext } from "react";

interface RoutineContextProps {
  newRoutine: Routine | null;
  setNewRoutine: React.Dispatch<React.SetStateAction<Routine | null>>;
  updateTaskSets: (taskId: string, newSets: ExerciseSet[]) => void;
  removeTask: (taskId: string) => void;
  updateName: (newName: string) => void;
  addSelectedExercises: (selectedExercises: Exercise[]) => void;
}

export const RoutineContext = createContext<RoutineContextProps>({
  newRoutine: null,
  setNewRoutine: () => {},
  updateTaskSets: () => {},
  removeTask: () => {},
  updateName: () => {},
  addSelectedExercises: () => {},
});
