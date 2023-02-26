import { RoutineTask } from "@/interfaces/routineTask";
import { useContext, useState } from "react";
import { RoutineContext } from "./RoutineContext";

interface RoutineProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const RoutineProvider = ({ children }: RoutineProviderProps) => {
  const [routineTasks, setRoutineTasks] = useState<RoutineTask[]>([]);

  return <RoutineContext.Provider value={{ routineTasks, setRoutineTasks }}>{children}</RoutineContext.Provider>;
};

export const useRoutineContext = () => useContext(RoutineContext);
