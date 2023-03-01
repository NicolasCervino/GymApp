import { RoutineTask } from "./routineTask";

export interface Routine {
  id: string;
  name: string;
  tasks: RoutineTask[];
}
