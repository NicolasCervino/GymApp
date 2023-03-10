import { ExerciseSet } from "@/interfaces/exerciseSet";
import { Routine } from "@/interfaces/routine";
import { RoutineTask } from "@/interfaces/routineTask";
import { Workout } from "@/interfaces/workout";
import { createContext } from "react";

interface WorkoutContextProps {
  currentWorkout: Workout | null;
  setCurrentWorkout: React.Dispatch<React.SetStateAction<Workout | null>>;
  createNewWorkout: (name: string, tasks: RoutineTask[]) => void;
  updateWorkoutTasks: (taskId: string, set: ExerciseSet[]) => void;
  removeWorkoutTask: (taskId: string) => void;
}

export const WorkoutContext = createContext<WorkoutContextProps>({
  currentWorkout: null,
  setCurrentWorkout: () => {},
  createNewWorkout: () => {},
  updateWorkoutTasks: () => {},
  removeWorkoutTask: () => {},
});
