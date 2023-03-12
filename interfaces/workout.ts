import { RoutineTask } from "./routineTask";

export interface Workout {
  name: string;
  id: string;
  duration: number;
  tasks: RoutineTask[];
  startTime: number;
}
