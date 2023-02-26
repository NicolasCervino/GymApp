import { RoutineTask } from "@/interfaces/routineTask";
import { createContext } from "react";

interface RoutineContextProps {
  routineTasks: RoutineTask[];
  setRoutineTasks: React.Dispatch<React.SetStateAction<RoutineTask[]>>;
}

export const RoutineContext = createContext<RoutineContextProps>({
  routineTasks: [],
  setRoutineTasks: () => {},
});
